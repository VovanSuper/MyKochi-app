import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class IsAnonymousGuard implements CanActivate {
  constructor(private userSvc: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userSvc.isLoggedIn$.pipe(
      map(loggedIn => {
        if (!!!loggedIn) {
          return true;
        }
        console.log('Anonymous.Guard failure !');
        this.router.navigateByUrl('/sensors');
        return false;
      })
    );
  }

}