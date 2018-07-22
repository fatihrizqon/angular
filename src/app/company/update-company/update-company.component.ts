import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {
  company         : Object;
  _id             : String;

  constructor(
    private companyService: CompanyService,
    private route : ActivatedRoute,
    private router : Router
  ){}

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
    let level = Number(localStorage.getItem('level'));

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

    if(level > 1){
      this.companyService.updateCompany(updateCompany).subscribe(
        company =>{
          this.company = updateCompany;
          console.log("Update by Admin Success.");
          this.router.navigate(['/company']);
        }
      );
    }else if(company.author != nim){
      console.log("Anda tidak memiliki akses mengubah data ini, silahkan kontak admin.");
      this.router.navigate(['/forbidden']);
    }else{
      this.companyService.updateCompany(updateCompany).subscribe(
        company =>{
          this.company = updateCompany;
          console.log("Update by Moderator Success.");
          this.router.navigate(['/company']);
        }
      );
    }
  }

}
