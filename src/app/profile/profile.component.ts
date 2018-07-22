import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl ,FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';
import { FlashMessage } from 'angular-flash-message';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  hide = true;
  results    :Object;
  companies  :Object;
  user       :Object;
  id         : String;
  nama       : String;
  email      : String;
  nim        : String;
  company    : String;
  password   : String;
  repassword : String;
  myControl  : FormControl = new FormControl();
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private http: Http,
    private validateService: ValidateService,
    private flashMessage: FlashMessage,
    private authService: AuthService,
    )
    {}

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.results = profile.results;
    },
    err => {
      console.log(err);
      return false;
    });

    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  updateProfileCompany(){
    var getUser = localStorage.getItem('user');
    getUser = JSON.parse(getUser);
    var id_student = getUser["id"];
    var nim        = getUser["nim"];
    var nama       = getUser["nama"];
    var email      = getUser["email"];
    var company    = this.company
    
    let user = { 
      id         : id_student, 
      nama       : nama,
      email      : email,
      nim        : nim,
      company    : this.company
    }
    if(user.company!=undefined){
      this.authService.updateProfileCompany(user)
      .subscribe(user => {this.user = user});
      this.router.navigate(['companies/'+this.company]);
    }
  }

  updateAccount(){
    const user = {
      nim       : this.nim,
      nama      : this.nama,
      email     : this.email,
      password  : this.password,
      repassword: this.repassword
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

    // Update Account
    this.authService.updateAccount(user).subscribe(data => {
      if(!data.success){
        this.flashMessage.warning('PERHATIAN : '+data.msg, {delay: 5000});
      }else{
        this.flashMessage.success('PESAN : Data Anda Telah Diperbarui.', {delay: 5000});
      }
    });
  }

  resetProfileCompany(user){
    this.authService.resetProfileCompany(user)
    .subscribe(user => {this.user = user});
    window.location.reload();
  }

  getCompanies(){
    this.companyService.getCompanies().subscribe(res =>{
      this.companies = res;
    });
  }
}

