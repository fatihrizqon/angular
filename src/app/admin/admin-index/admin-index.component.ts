import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ReportService } from '../../../services/report.service';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['../admin/admin.component.css']
})
export class AdminIndexComponent implements OnInit {
  users : Object;
  reports  : Object;
  companies  : Object;
  constructor(
    private router: Router,
    private authService: AuthService,
    private reportService: ReportService,
    private companyService: CompanyService
  )
  {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('id_token');
    let level = Number(localStorage.getItem('level'));
    if(this.authService.loggedIn(user, token, level)){
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
  ngOnInit(){
    this.authService.getUsers().subscribe(users => {
      this.users = users;
    },
    err => {
      console.log(err);
      return false;
    });
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
    },
    err => {
      console.log(err);
      return false;
    });
    this.reportService.getReports().subscribe(reports => {
      this.reports = reports;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  logoutUser(){
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }
}
