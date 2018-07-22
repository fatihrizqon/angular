import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ReportService } from '../../../../services/report.service';
@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['../../admin/admin.component.css']
})
export class ViewReportComponent implements OnInit {
  report          : Object;
  _id             : String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private reportService: ReportService
  ) {
    this._id = this.route.snapshot.paramMap.get('id');
    this.reportService.getReport(this._id).subscribe(
      report => {
        this.report = report;
        console.log(this.report)
      },
    );
    
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

}
