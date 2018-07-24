import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ReportService } from '../../../services/report.service';
import { Report } from '../../../models/report.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css']
})
export class AdminReportComponent implements OnInit {

  report   : Object;
  reports  : Object;
  displayedColumns = ['title', 'text', 'created_at', 'author', 'status', 'option'];
  dataSource: MatTableDataSource<Report>;
  constructor(
    private router: Router,
    private authService: AuthService,
    private reportService: ReportService
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
    
    this.reportService.getReports().subscribe(reports => {
      this.reports = reports;
      this.dataSource = new MatTableDataSource(reports);
    },
    err => {
      console.log(err);
      return false;
    });
  }

  ngOnInit() {
  }

  viewReport(reports){
    this.reportService.setter(reports);
    this.router.navigate(['/admin/view-report/'+reports._id]);
  }

  deleteReport(reports){
    var _id = reports._id;
    this.reportService.deleteReport(_id).subscribe(
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
