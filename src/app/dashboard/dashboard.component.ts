import { Component, OnInit, NgZone, Input, Output, animate } from '@angular/core';
import { MatSnackBar, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { EventEmitter } from 'protractor';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  results         : Object;
  companies       : Object;
  company         : Object;
  _id             : String;
  perusahaan      : String;
  deskripsi       : String;
  email_perusahaan: String;
  alamat          : String;
  telepon         : String;
  status          : String;
  word            : String;

  constructor(
    private snackBar: MatSnackBar,
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private companyService: CompanyService,
    private http: Http,
    )
    {
      let user  = localStorage.getItem('user');
      let token = localStorage.getItem('id_token');
      let level = Number(localStorage.getItem('level'));
      if(this.authService.loggedIn(user, token, level)) {
        if(!user){
          this.router.navigate(['/']);
          console.log('Please Login.');
        }
      }
      this.companyService.getCompanies().subscribe(companies => {
        this.companies = companies;
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
}
