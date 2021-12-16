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
  private roles: string[] = [];
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
        this.roles = user.roles;
        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
        this.username = user.username;
      } else {
        this.goToLogin();
      }
    });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.loginSharedService.pushIsLoggedIn(!!this.tokenStorageService.getToken());
    this.loginSharedService.pushIsLoggedOut(!this.tokenStorageService.getToken());
  }

  goToLogin() {
    this.router.navigateByUrl(RoutesEnum.LOGIN);
  }

  goToRegistration() {
    this.router.navigateByUrl(RoutesEnum.REGISTER);
  }
}

