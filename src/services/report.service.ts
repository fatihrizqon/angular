import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Report } from '../models/report.model';

@Injectable()

export class ReportService {
  authToken: any;
  user: any;
  private report:Report;

  constructor(
    private http:Http,
  ) { }
  private baseUri:String='';
  // private baseUri:String='http://localhost:8080/';

  loadToken(){
    const token = localStorage.getItem('id_token'); 
    this.authToken = token;
  }
  
  getReports(){
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUri+'reports', {headers: headers})
    .map(res => res.json());
  }

  getReport(_id){
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUri+'reports/'+_id, {headers: headers})
    .map(res => res.json());
  }
   
  addReport(report){
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUri+'reports/addReport', report ,{headers:headers})
    .map(res => res.json()); 
  }

  deleteReport(_id){ 
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.baseUri+'reports/deleteReport/'+_id,{headers:headers})
    .map(res => res.json()); 
  }

  setter(report:Report){ 
    this.report = report;
  }

}
