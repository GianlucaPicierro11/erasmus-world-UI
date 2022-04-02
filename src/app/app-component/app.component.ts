import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { RoutesEnum } from 'app/shared/enumerations/routes.enum';
import { LocaleLanguageService } from 'app/core/app-access/services/locale-language/locale-language.service';
import { LoginSharedService } from 'app/core/app-access/services/login-shared/login-shared.service';
import { TokenStorageService } from 'app/core/app-access/services/token-storage/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  logoPath: string = environment.BASE_URL_UI + 'assets/images/ESN_short-logo-Satellite.png';

  username?: string;



  constructor(private tokenStorageService: TokenStorageService, private router: Router,
    public loginSharedService: LoginSharedService, private localeLanguageService: LocaleLanguageService) {
  }

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

