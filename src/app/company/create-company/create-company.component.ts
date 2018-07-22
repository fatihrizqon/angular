import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { ValidateService } from '../../../services/validate.service';
import { Company } from '../../../models/company.model';
import { FormGroup, FormControl ,FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessage } from 'angular-flash-message';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
  private company  : Company;
  user             : Object;
  nama             : String;
  alamat           : String;
  deskripsi        : String;
  email_perusahaan : String;
  website          : String;
  telepon          : String;
  kategori         : String;
  nim              : String;
  constructor(
    private route:Router,
    private validateService:ValidateService,
    private flashMessage: FlashMessage,
    private authService: AuthService,
    private companyService:CompanyService
  ) {

    let user = localStorage.getItem('user');
    let token = localStorage.getItem('id_token');
    let level = Number(localStorage.getItem('level'));
    if(this.authService.loggedIn(user, token, level)) {
      if(level == 1){
        this.route.navigate(['/company']);
        console.log('Unauthorized.');
      }else{
        console.log('Admin Mode.');
      }
    }else{
        this.route.navigate(['/dashboard']);
        console.log('Unauthorized.');
    }

    // di naskah, tambai
  }

  ngOnInit() {  
  }

  addCompany(event:any){
    user = localStorage.getItem('user');
    var user = JSON.parse(user);
    var nim  = user["nim"];
    const company = {
      perusahaan      : this.nama,
      alamat          : this.alamat,
      deskripsi       : this.deskripsi,
      email_perusahaan: this.email_perusahaan,
      website         : this.website,
      telepon         : this.telepon,
      kategori        : this.kategori,
      author          : nim,
      update_by       : ''
    }
    if(!this.validateService.validateAddCompany(company)){
      this.flashMessage.warning('WARNING : Please fill in all fields.', {delay: 5000});
      return false;
    }
    if(!this.validateService.validateEmail(company.email_perusahaan)){
      this.flashMessage.warning('WARNING : Please fill validate email.', {delay: 5000});
      return false;
    }
    this.companyService.addCompany(company).subscribe(company => {
      this.company = company;
    });
    this.authService.upgrade(user).subscribe(user => {
      this.user = user;
    });
    this.route.navigate(['/company']);
  }

}
