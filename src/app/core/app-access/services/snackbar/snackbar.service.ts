import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LanguageLocaleIdEnum } from 'app/shared/enumerations/language-locale-id.enum';
import { LocaleLanguageService } from '../locale-language/locale-language.service';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar, private localeLanguageService: LocaleLanguageService) { }

  openSuccessSnackBar(messageEn: string, messageIt: string) {
    this.openSnackbar(this.localeLanguageService.getLanguage() == LanguageLocaleIdEnum.ITALIAN ? messageIt : messageEn, 'snackbarSuccess', 5000);
  }

  openErrorSnackBar(messageEn: string, messageIt: string) {
    this.openSnackbar(this.localeLanguageService.getLanguage() == LanguageLocaleIdEnum.ITALIAN ? messageIt : messageEn, 'snackbarError', 5000);
  }

  openInfoSnackWarn(messageEn: string, messageIt: string) {

    this.openSnackbar(this.localeLanguageService.getLanguage() == LanguageLocaleIdEnum.ITALIAN ? messageIt : messageEn, 'snackbarWarn', 5000);
  }

  private openSnackbar(message: string, panelClass: string, duration: number) {
    this._snackBar.open(message, "X", {
      duration: duration,
      panelClass: panelClass,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
