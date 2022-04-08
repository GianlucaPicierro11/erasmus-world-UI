import {
  Component, OnInit

} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { RoutesEnum } from 'app/shared/enumerations/routes.enum';
import { LocaleLanguageService } from 'app/shared/services/locale-language/locale-language.service';
import { LoginSharedService } from 'app/shared/services/login-shared/login-shared.service';
import { TokenStorageService } from 'app/shared/services/token-storage/token-storage.service';
import { SocialAuthService } from "angularx-social-login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  logoPath: string = environment.BASE_URL_UI + 'assets/images/ESN_short-logo-Satellite.png';
  username?: string;

  constructor(private tokenStorageService: TokenStorageService, private router: Router,
    public loginSharedService: LoginSharedService, private localeLanguageService: LocaleLanguageService,
    private authService: SocialAuthService) {
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
    this.authService.signOut().finally(() => {
      this.tokenStorageService.signOut();
      this.loginSharedService.pushIsLoggedIn(!!this.tokenStorageService.getToken());
      this.loginSharedService.pushIsLoggedOut(!this.tokenStorageService.getToken());
      this.router.navigateByUrl(RoutesEnum.LOGIN);
    });
  }

  goToHomePage() {
    this.router.navigateByUrl(RoutesEnum.HOME);
  }

  goToEditProfile() {
    this.router.navigateByUrl(RoutesEnum.EDIT_PROFILE);
  }

  goToLogin() {
    this.router.navigateByUrl(RoutesEnum.LOGIN);
  }

  goToRegistration() {
    this.router.navigateByUrl(RoutesEnum.REGISTER);
  }

}

