import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { LanguageFlagPathEnum } from 'app/shared/enumerations/language-flag-path.enum';
import { LanguageLocaleIdEnum } from 'app/shared/enumerations/language-locale-id.enum';
import { RoutesEnum } from 'app/shared/enumerations/routes.enum';
import { LanguageModel } from 'app/core/app-access/models/language.model';
import { LocaleLanguageService } from 'app/core/app-access/services/locale-language/locale-language.service';
import { LoginSharedService } from 'app/core/app-access/services/login-shared/login-shared.service';
import { TokenStorageService } from 'app/core/app-access/services/token-storage/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  @ViewChild('flags', { static: false })
  flagsSelect!: MatMenu;

  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  languageSelected: LanguageModel;
  languages: Array<LanguageModel> = [
    { localeId: LanguageLocaleIdEnum.ENGLISH, flagPath: this.getLanguagePath(LanguageFlagPathEnum.ENGLISH) },
    { localeId: LanguageLocaleIdEnum.ITALIAN, flagPath: this.getLanguagePath(LanguageFlagPathEnum.ITALIAN) }
  ];


  constructor(private tokenStorageService: TokenStorageService, private router: Router,
    public loginSharedService: LoginSharedService, private localeLanguageService: LocaleLanguageService) {
    if (window.location.href.includes(`/${LanguageLocaleIdEnum.ITALIAN}`)) {
      this.languageSelected = { localeId: LanguageLocaleIdEnum.ITALIAN, flagPath: this.getLanguagePath(LanguageFlagPathEnum.ITALIAN) }
      this.localeLanguageService.setLanguage(LanguageLocaleIdEnum.ITALIAN);
    } else {
      this.languageSelected = { localeId: LanguageLocaleIdEnum.ENGLISH, flagPath: this.getLanguagePath(LanguageFlagPathEnum.ENGLISH) };
      this.localeLanguageService.setLanguage(LanguageLocaleIdEnum.ENGLISH);
    }



  }

  private getLanguagePath(languageFlagPathEnum: LanguageFlagPathEnum): string {
    return environment.BASE_URL_UI + languageFlagPathEnum;
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

  onSelect(languageFlagPath: LanguageModel) {
    let previusLanguageSelected = this.languageSelected;
    this.languageSelected = languageFlagPath;
    this.localeLanguageService.setLanguage(languageFlagPath.localeId);
    window.location.assign(window.location.href.replace(previusLanguageSelected.localeId, languageFlagPath.localeId));
  }
}

