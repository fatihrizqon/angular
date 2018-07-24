import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  // private baseUri:String='';
  private baseUri:String='http://localhost:8080/';
  authToken: any;
  user     : any;
  level    : any;
  constructor(
    private router: Router,
    private http:Http){}

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUri+'users/register', user, {headers: headers})
    .map(res => res.json());
  }

  updateAccount(user){
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.baseUri+'users/updateAccount', user, {headers: headers})
    .map(res => res.json());
  }

  loginUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUri+'users/authenticate', user, {headers: headers})
    .map(res => res.json());
  }

  getUsers(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUri+'users', {headers: headers})
    .map(res => res.json()); 
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    var users = localStorage.getItem(this.user);
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUri+'users/profile', {headers: headers})
    .map(res => res.json());
  }  
  
  resetProfileCompany(user){
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.baseUri+'users/reset', user, {headers: headers})
    .map(res => {
      return res.json();
    });
  }

  updateProfileCompany(user){
    let headers = new Headers();
    this.loadToken();
    var users = localStorage.getItem(this.user);
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.baseUri+'users/update', user, {headers: headers})
    .map(res => {
      return res.json();
    });
  }

  upgrade(user){
    const level = localStorage.getItem('level');
    if(level == '0'){
      localStorage.setItem('level', '1');
    }
    let headers = new Headers();
    this.loadToken();
    var users = localStorage.getItem(this.user);
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.baseUri+'users/upgrade', user, {headers: headers})
    .map(res => {
      return res.json();
    });
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getUserData(user){
    localStorage.getItem(user);
    this.user=user;
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('level', user.level);
    this.authToken = token;
    this.user = user;
  }

  loggedIn(token, user, level){
    return tokenNotExpired('id_token', user);
  }

  isLogin(token, user){
    if(!token && !user){
      return false;
    }
  }
  
  makeAdmin(_id){
    this.loadToken();
    let headers = new Headers()
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    console.log(_id)
    return this.http.put(this.baseUri+'users/makeAdmin/'+_id,null, {headers: headers})
    .map(res => res.json());
  }

  adminMenu(){
    const level = Number(localStorage.getItem('level'));
    if(level == 2){
      return true;
    }
  }

  deleteUser(_id){ 
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete(this.baseUri+'users/deleteUser/'+_id,{headers:headers})
    .map(res => res.json()); 
  }

  moderatorMenu(){
    const level = Number(localStorage.getItem('level'));
    if(level == 1 || level > 1){
      return true;
    }
  }

  logoutUser(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
