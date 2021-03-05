import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser$$ = new BehaviorSubject<firebase.User>(null);
  private isLoggedIn$$ = new BehaviorSubject<boolean>(null);

  setCurrentUser(user: firebase.User) {
    this.currentUser$$.next(user);
    this.setLoggedIn(true);
  }

  setLoggedIn(val = false) {
    this.isLoggedIn$$.next(val);
  }

  public get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn$$.asObservable();
  }

  public get currentUser$(): Observable<firebase.User | null> {
    return this.currentUser$$.asObservable();
  }

  constructor() { }
}
