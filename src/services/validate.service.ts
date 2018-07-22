import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
  validateRegister(user){
    if(user.nama == undefined || user.email == undefined || user.nim == undefined || user.password == undefined){
      return false;
    }else{
      return true;
    }
  }

  validateLogin(user){
    if(user.nim == undefined || user.password == undefined){
      return false;
    }else{
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePassword(user){
    if(user.password != user.repassword){
      return false;
    }else{
      return true;
    }
  }

  validateAddCompany(company){
    if(company.perusahaan == undefined || company.alamat == undefined || company.email_perusahaan == undefined || company.telepon == undefined || company.deskripsi == undefined || company.website == undefined || company.kategori == undefined){
      return false;
    }else{
      return true;
    }
  }

  validateAddReport(report){
    if(report.title == undefined || report.text == undefined){
      return false;
    }else{
      return true;
    }
  }

}
