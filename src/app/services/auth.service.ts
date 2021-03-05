import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthGuard, loggedIn } from '@angular/fire/auth-guard';
import { from, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private fbAuth: AngularFireAuth, private userSvc: UserService) { }

  logIn({ email, password }: { email: string, password: string; }) {
    return from(this.fbAuth.signInWithEmailAndPassword(email, password)).pipe(
      tap(userCreds => console.log(`Logged in with User Details ${JSON.stringify(userCreds)}`)),
      tap(userCreds => this.userSvc.setCurrentUser(userCreds.user)),
      map(userCreds => !!userCreds.user),
      catchError(err => {
        console.error(`[AuthSvc->logIn()]::: ${err}`);
        return throwError(err);
      })
    );
  }

  logOut() {
    return from(this.fbAuth.signOut()).pipe(
      tap(_ => console.log('Signing out...')),
      tap(_ => this.userSvc.setCurrentUser(null)),
      catchError(err => {
        console.error(`[AuthSvc->logOUT()]::: ${err}`);
        return throwError(err);
      })
    );
  }

}