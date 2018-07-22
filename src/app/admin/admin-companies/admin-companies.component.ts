import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../models/company.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
@Component({
  selector: 'app-admin-companies',
  templateUrl: './admin-companies.component.html',
  styleUrls: ['../admin/admin.component.css']
})
export class AdminCompaniesComponent implements OnInit {
  company   : Object;
  companies : Object;
  displayedColumns = ['perusahaan', 'alamat', 'telepon','email','website','students','kategori','author','update_by', 'option'];
  dataSource: MatTableDataSource<Company>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue; 
  }
  constructor(
    private router: Router,
    private authService: AuthService,
    private companyService: CompanyService
  ) 
  {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('id_token');
    let level = Number(localStorage.getItem('level'));
    if(this.authService.loggedIn(user, token, level)) {
      if(level == 0 || level == 1){
        this.router.navigate(['/dashboard']);
        console.log('Unauthorized.');
      }else{
        console.log('Admin Mode.');
      }
    }else{
        this.router.navigate(['/dashboard']);
        console.log('Unauthorized.');
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
  
  getCompany(data){
    this.companyService.getCompany(data._id).subscribe(
      company => {
        this.router.navigate(['companies/'+data._id]);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateCompany(companies){
    this.companyService.setter(companies);
    this.router.navigate(['/admin/companies/update/'+companies._id]);
  }
  
  deleteCompany(company){
    var _id = company._id;
    this.companyService.deleteCompany(_id).subscribe(
      _id => {
        console.log("Delete Success.");
      },
      err => {
        console.log(err);
      }
    );
  }
}

