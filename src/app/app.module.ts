import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';

import { SpinnerSharedService } from './core/app-access/services/spinner-shared/spinner-shared.service';
import { SpinnerInterceptor } from './interceptors/spinner/spinner.interceptor';
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
  ],
  entryComponents: [
    IconSnackbarComponent
  ],
  providers: [SpinnerSharedService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
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
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
