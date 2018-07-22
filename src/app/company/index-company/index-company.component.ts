import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CompanyService } from '../../../services/company.service';
import { AuthService } from '../../../services/auth.service';
import { Company } from '../../../models/company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-company',
  templateUrl: './index-company.component.html',
  styleUrls: ['./index-company.component.css']
})

export class IndexCompanyComponent implements OnInit {
  company   : Object;
  companies : Object;
  displayedColumns = ['perusahaan', 'kategori', 'mahasiswa', 'option'];
  dataSource: MatTableDataSource<Company>;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue; 
  }
  constructor(
    private router: Router,
    private authService: AuthService,
    private companyService: CompanyService,
  )
  {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('id_token');
    let level = Number(localStorage.getItem('level'));
    if (!this.authService.loggedIn(user, token, level)) {
      this.router.navigate(['/']);
      console.log('Please login first.');
    }
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
      this.dataSource = new MatTableDataSource(companies);
    },
    err => {
      console.log(err);
      return false;
    });
  }
  ngOnInit(){
  }
  viewCompany(companies){
    this.router.navigate(['companies/'+companies._id]);
  }
  addCompany(event:any){
    event.preventDefault();
    this.companyService.setter(new Company());
    this.router.navigate(['company/addCompany']);
  }
  updateCompany(companies){
    this.companyService.setter(companies);
    this.router.navigate(['company/updateCompany/'+companies._id]);
  }
  deleteCompany(company){
    var _id = company._id;
    this.companyService.deleteCompany(_id).subscribe(
      _id => {
        console.log("Delete Success.");
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }
}
