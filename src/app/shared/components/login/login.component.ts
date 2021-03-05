import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    nameValue: new FormControl('', [Validators.required, Validators.minLength(2), Validators.email]),
    passwordValue: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  logIn() {
    const { nameValue: email, passwordValue: password } = this.loginForm.value;
    this.authSvc.logIn({ email, password }).subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/sensors');
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }
}
