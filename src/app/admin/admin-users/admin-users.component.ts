import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['../admin/admin.component.css']
})
export class AdminUsersComponent implements OnInit {
  _id    : String;
  user   : Object;
  users  : Object;
  displayedColumns = ['nama', 'nim', 'email','prodi','angkatan','level', 'option'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue; 
  }
  constructor(
    private router: Router,
    private authService: AuthService,
  )
  {
    let user  = localStorage.getItem('user');
    let token = localStorage.getItem('id_token');
    let level = Number(localStorage.getItem('level'));
    if(this.authService.loggedIn(user, token, level)) {
      if(level != 2){
        this.router.navigate(['/dashboard']);
        console.log('Unauthorized.');
      }else{
        console.log('Admin Mode.');
      }
    }else{
        this.router.navigate(['/dashboard']);
        console.log('Unauthorized.');
    }
    
    this.authService.getUsers().subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users);
    },
    err => {
      console.log(err);
      return false;
    });
  }

  ngOnInit() {
  }

  makeAdmin(user){
    var _id = user._id;
    this.authService.makeAdmin(_id).subscribe(
    _id => {
      this._id = _id;
      window.location.reload();
    },
    err =>{
      console.log(err)
    });
  }

  deleteUser(user){
    var _id = user._id;
    this.authService.deleteUser(_id).subscribe(
      _id => {
        console.log("Delete Success.");
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

}
