import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { LanguageFlagPathEnum } from './enumerations/language-flag-path.enum';
import { LanguageLocaleIdEnum } from './enumerations/language-locale-id.enum';
import { RoutesEnum } from './enumerations/routes.enum';
import { LanguageModel } from './models/language.model';
import { LocaleLanguageService } from './services/locale-language/locale-language.service';
import { LoginSharedService } from './services/login-shared/login-shared.service';
import { TokenStorageService } from './services/token-storage/token-storage.service';

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
    this.languageSelected = localeLanguageService.getLanguage()
      == LanguageLocaleIdEnum.ENGLISH ?
      { localeId: LanguageLocaleIdEnum.ENGLISH, flagPath: this.getLanguagePath(LanguageFlagPathEnum.ENGLISH) } :
      { localeId: LanguageLocaleIdEnum.ITALIAN, flagPath: this.getLanguagePath(LanguageFlagPathEnum.ITALIAN) };
    console.log(this.router.url);
    this.router.navigateByUrl(this.router.url.replace(LanguageLocaleIdEnum.ENGLISH || LanguageLocaleIdEnum.ITALIAN, localeLanguageService.getLanguage()));
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
    this.router.navigateByUrl(this.router.url.replace(previusLanguageSelected.localeId, languageFlagPath.localeId));

  }
}

