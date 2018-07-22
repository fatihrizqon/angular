import { Component, OnInit, Output, EventEmitter, Input, HostListener  } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AdminSidenavComponent } from '../admin-sidenav/admin-sidenav.component';

@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.css']
})
export class AdminToolbarComponent implements OnInit {
  
  @Output() toggleSideNav = new EventEmitter<boolean>();
  navToggle() {
    this.toggleSideNav.emit(true);
  }
  
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

  ngOnInit() {
    
  }


  logoutUser(){
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }
}
