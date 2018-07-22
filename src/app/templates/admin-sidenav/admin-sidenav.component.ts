import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.css']
})
export class AdminSidenavComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private router : Router,
  ) 
  {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('id_token');
    let level = Number(localStorage.getItem('level'));
    if (!this.authService.loggedIn(user, token, level)) {
      this.router.navigate(['/']);
      console.log('Please login first.');
    }
  }

  ngOnInit(){}


  logoutUser(){
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }
}
