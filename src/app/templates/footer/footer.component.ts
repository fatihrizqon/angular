import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessage } from 'angular-flash-message';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(
    private router: Router,
    private flashMessage: FlashMessage,
    private authService: AuthService,
  ){}

  ngOnInit() {
  }

  logoutUser(){
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }
}
