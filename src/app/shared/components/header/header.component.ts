import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from 'src/app/services/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AngularFireAuth, private router: Router, public authSvc: AuthService) { }
  // avatar = 'https://ng-web-apis.github.io/dist/assets/images/web-api.svg';

  ngOnInit() { }

  logOut() {
    this.authSvc.logOut().pipe(untilDestroyed(this)).subscribe(_ => this.router.navigateByUrl('/'));
  }

  logIn() {
    this.router.navigateByUrl('/auth');
  }

}
