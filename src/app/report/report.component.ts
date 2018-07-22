import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { ReportService } from '../../services/report.service';
import { FlashMessage } from 'angular-flash-message';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  company : Object;
  report  : Object;
  _id     : String;
  title   : String;
  text    : String;
  constructor(
    private validateService: ValidateService,
    private companyService: CompanyService,
    private reportService: ReportService,
    private route : ActivatedRoute,
    private router : Router,
    private flashMessage: FlashMessage,
  ){}

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.companyService.getCompany(this._id).subscribe(
      company => {
        this.company = company;
      },
    );
  }

  addReport(){
    user = localStorage.getItem('user');
    var user = JSON.parse(user);
    var nim  = user["nim"];
    const report = {
      title  : this.title,
      text   : this.text,
      company: this._id,
      author : nim
    }
    if(!this.validateService.validateAddReport(report)){
      this.flashMessage.warning('WARNING : Please fill in all fields.', {delay: 5000});
      return false;
    }
    this.reportService.addReport(report).subscribe(report => {
      this.report = report;
    });
    this.router.navigate(['companies/'+this._id]);
  }
}
