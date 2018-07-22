import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

// class Permissions{
//   canActivate(user, token):boolean{
//     return true;
//   }
// }

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // private permissions : Permissions,
    private router: Router,
    private authService: AuthService,
){}
  

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let user;
    let token;
    let level;
    if (this.authService.loggedIn(user, token, level)) {
      return true;
    }else{
      this.router.navigate(['/']);
      console.log('Please login first.');
      return false;
    }
  }
}
