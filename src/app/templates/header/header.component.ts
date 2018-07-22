import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessage } from 'angular-flash-message';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:Object;
  level:Number;

  constructor(
    private router: Router,
    private flashMessage: FlashMessage,
    private authService: AuthService
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

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      return false;
    });
  }

  // adminMenu(){
  //   const level = Number(localStorage.getItem('level'));
  //   if(level == 1){
  //     return true;
  //   }
  // }

  logoutUser(){
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }

}
