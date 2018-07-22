import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {
  company         : Object;
  _id             : String;

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.companyService.getCompany(this._id).subscribe(
      company => {
        this.company = company;
      }
    );
  }
  
  updateCompany(company){
    this.companyService.setter(company);
    this.router.navigate(['company/updateCompany/'+this._id]);
  }
  deleteCompany(company){
    var _id = this._id;
    this.companyService.deleteCompany(_id).subscribe(
      _id => {
        console.log("Delete Success.");
        this.router.navigate(['/company']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
