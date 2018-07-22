import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CompanyService } from '../../../../services/company.service';
import { Company } from '../../../../models/company.model';
import { ValidateService } from '../../../../services/validate.service';
import { FlashMessage } from 'angular-flash-message';

@Component({
  selector: 'app-admin-create-company',
  templateUrl: './admin-create-company.component.html',
  styleUrls: ['../../admin/admin.component.css']
})
export class AdminCreateCompanyComponent implements OnInit {
  private company  : Company; 
  nama             : String;
  alamat           : String;
  deskripsi        : String;
  email_perusahaan : String;
  website          : String;
  telepon          : String;
  kategori         : String;

  constructor(
    private router: Router,
    private authService: AuthService,
    private flashMessage: FlashMessage,
    private companyService : CompanyService,
    private validateService: ValidateService,
  ) {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('id_token');
    let level = Number(localStorage.getItem('level'));
    if(this.authService.loggedIn(user, token, level)) {
      if(level != 2){
        this.router.navigate(['/dashboard']);
        console.log('Unauthorized.');
      }else{
        console.log('Admin Mode.');
      }
    }else{
        this.router.navigate(['/dashboard']);
        console.log('Unauthorized.');
    }
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
    this.router.navigate(['/admin/companies']);
  }
}
