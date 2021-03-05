import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class IsAuthGuard implements CanActivate, CanLoad {
  constructor(private userSvc: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userSvc.isLoggedIn$.pipe(
      // filter(loggedIn => !!loggedIn),
      map(loggedIn => {
        if (!!loggedIn) {
          return true;
        }
        console.log('Auth.Guard failure !');
        this.router.navigateByUrl('/auth');
        return false;
      })
    );
  }

  canLoad() {
    return this.userSvc.isLoggedIn$.pipe(
      // filter(loggedIn => !!loggedIn),
      map(loggedIn => {
        if (!!loggedIn) {
          return true;
        }
        console.log('Auth.Guard failure !');
        this.router.navigateByUrl('/auth');
        return false;
      })
    );
  }

}