import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl ,FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlashMessage, FlashMessageModule } from 'angular-flash-message';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { MatSnackBar } from '@angular/material';


@Component({ 
  selector    : 'app-login',
  templateUrl : './login.component.html',
  styleUrls   : ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  user       : any;
  nama       : String;
  email      : String;
  nim        : String;
  password   : String;
  repassword : String;
  status     : Number = 0;
  precision  : Number;
  recall     : Number;
  level      : Number;

  onChange(value) {
    if (value.checked === true) {
      this.status    = 1;
      this.precision = 0;
      this.recall    = 1;
    } else {
      this.status    = 0;
      this.precision = 1;
      this.recall    = 0;
    }
  }

  constructor(
    private router: Router,
    private validateService: ValidateService,
    private flashMessage: FlashMessage,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private zone: NgZone,
  )
{
  console.log('🍕 You are running on MEAN Stack App 🍕');
  console.log('Touch me on : http://instagram.com/fatihrizqon');
  const token = localStorage.getItem('id_token');
  if(token){
    this.router.navigate(['/dashboard']);
  }
}

  ngOnInit(){
  }

  registerUser(e){
    
    const user = {
      nama       : this.nama,
      email      : this.email,
      nim        : this.nim,
      password   : this.password,
      repassword : this.repassword,
      precision  : this.precision,
      recall     : this.recall,
      status     : this.status,
      level      : 0
    }

    // Form Validation
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.warning('PERHATIAN : Harap isi semua form.', {delay: 5000});
      return false;
    }

    // Password Validation
    if(!this.validateService.validatePassword(user)){
      this.flashMessage.warning('PERHATIAN : Password tidak cocok.', {delay: 5000});
      return false;
    }

    // Email Validation
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.warning('PERHATIAN : Email salah.', {delay: 5000});
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.success('PESAN : Anda Telah Terdaftar, silahkan login.', {delay: 5000});
        this.router.navigate(['/']);
      }else{
        this.flashMessage.warning('PERHATIAN : '+data.msg, {delay: 5000});
        this.router.navigate(['/']);
      }
    });
  }

  loginUser(e){
    const user = {
      nim        : this.nim,
      password   : this.password
    }

    // Form Validation
    if(!this.validateService.validateLogin(user)){
      this.flashMessage.warning('PERHATIAN : Harap isi semua form.', {delay: 5000});
      return false;
    }
    this.authService.loginUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/dashboard']);
      }
      else{
        this.flashMessage.warning('PERHATIAN : '+data.msg, {delay: 5000});
        this.router.navigate(['/']);
      }
    });

  }

}
