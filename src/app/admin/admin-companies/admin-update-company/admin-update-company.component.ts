import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CompanyService } from '../../../../services/company.service';
import { Company } from '../../../../models/company.model';
import { ValidateService } from '../../../../services/validate.service';
import { FlashMessage } from 'angular-flash-message';

@Component({
  selector: 'app-admin-update-company',
  templateUrl: './admin-update-company.component.html',
  styleUrls: ['../../admin/admin.component.css']
})
export class AdminUpdateCompanyComponent implements OnInit {
  company         : Object;
  _id             : String;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this._id = this.route.snapshot.paramMap.get('id');
    this.companyService.getCompany(this._id).subscribe(
      company => {
        this.company = company;
      },
    );
  }

  updateCompany(company){
    var user = localStorage.getItem('user');
    user = JSON.parse(user);
    var nim = user["nim"];
    let updateCompany = {
      _id             : company._id,
      perusahaan      : company.perusahaan,
      alamat          : company.alamat,
      deskripsi       : company.deskripsi,
      email_perusahaan: company.email_perusahaan,
      website         : company.website,
      telepon         : company.telepon,
      kategori        : company.kategori,
      update_by       : nim
    }
    this.companyService.updateCompany(updateCompany).subscribe(
      company =>{
        this.company = updateCompany
      }
    );
    console.log("Update Success.");
    this.router.navigate(['/admin/companies']);
  }

}
