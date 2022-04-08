import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { LocaleLanguageService } from './shared/services/locale-language/locale-language.service';
import { AppComponent } from './app-component/app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconSnackbarComponent } from './shared/components/icon-snackbar/icon-snackbar.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SocialLoginModule
  ],
  entryComponents: [
    IconSnackbarComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: MAT_DATE_LOCALE,
      useFactory: (localeService: LocaleLanguageService) => {
        return localeService.getLanguage();
      },
      deps: [LocaleLanguageService]
    },
    {
      provide: LOCALE_ID,
      useFactory: (localeService: LocaleLanguageService) => {
        return localeService.getLanguage();
      },
      deps: [LocaleLanguageService]
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('361107942444781')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
