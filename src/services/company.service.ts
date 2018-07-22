import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Company } from '../models/company.model';
 
@Injectable()
export class CompanyService {
  // private baseUri:String='';  
  private baseUri:String='http://localhost:8080/';
  // private baseUri:String='http://192.168.100.10:3000';
  private company:Company;

  authToken: any;
  user: any;
  constructor(
    private http:Http,
  )
  {}
  
  loadToken(){
    const token = localStorage.getItem('id_token'); 
    this.authToken = token;
  }
   
  addCompany(company){
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUri+'companies/addCompany', company ,{headers:headers})
    .map(res => res.json()); 
  } 

  updateCompany(company){
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.baseUri+'companies/updateCompany', company ,{headers:headers})
    .map(res => res.json()); 
  }

  deleteCompany(_id){ 
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.baseUri+'companies/deleteCompany/'+_id,{headers:headers})
    .map(res => res.json()); 
  }

  getCompanies(){
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUri+'companies', {headers: headers})
    .map(res => res.json());
  }

  getCompany(_id){
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUri+'companies/'+_id, {headers: headers})
    .map(res => res.json());
  }

  setter(company:Company){ 
    this.company = company;
  }
  getter(){
    return this.company;
  }
}


