import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum } from './enumerations/routes.enum';
import { LoginSharedService } from './services/login-shared/login-shared.service';
import { TokenStorageService } from './services/token-storage/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService, private router: Router, public loginSharedService: LoginSharedService) { }

  ngOnInit(): void {
    this.loginSharedService.pushIsLoggedIn(!!this.tokenStorageService.getToken());
    this.loginSharedService.pushIsLoggedOut(!this.tokenStorageService.getToken());
    this.loginSharedService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.username = user?.username;
      }
    });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.loginSharedService.pushIsLoggedIn(!!this.tokenStorageService.getToken());
    this.loginSharedService.pushIsLoggedOut(!this.tokenStorageService.getToken());
    this.router.navigateByUrl(RoutesEnum.LOGIN);
  }

  goToLogin() {
    this.router.navigateByUrl(RoutesEnum.LOGIN);
  }

  goToRegistration() {
    this.router.navigateByUrl(RoutesEnum.REGISTER);
  }
}

