import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconSnackbarComponent } from 'app/shared/components/icon-snackbar/icon-snackbar.component';
import { LanguageLocaleIdEnum } from 'app/shared/enumerations/language-locale-id.enum';
import { SnackBarTypeEnum } from 'app/shared/enumerations/snakbar-type.enum';
import { LocaleLanguageService } from '../locale-language/locale-language.service';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar, private localeLanguageService: LocaleLanguageService) { }

  openSuccessSnackBar(messageEn: string, messageIt: string) {
    this.openSnackbar(SnackBarTypeEnum.SUCCESS, this.localeLanguageService.getLanguage() == LanguageLocaleIdEnum.ITALIAN ? messageIt : messageEn, 'done', 'snackbarSuccess');
  }

  openErrorSnackBar(messageEn: string, messageIt: string) {
    this.openSnackbar(SnackBarTypeEnum.ERROR, this.localeLanguageService.getLanguage() == LanguageLocaleIdEnum.ITALIAN ? messageIt : messageEn, 'report_gmailerrorred', 'snackbarError');
  }

  openWarnSnackBar(messageEn: string, messageIt: string) {
    this.openSnackbar(SnackBarTypeEnum.WARN, this.localeLanguageService.getLanguage() == LanguageLocaleIdEnum.ITALIAN ? messageIt : messageEn, 'warning', 'snackbarWarn');
  }

  openInfoSnackBar(messageEn: string, messageIt: string) {
    this.openSnackbar(SnackBarTypeEnum.INFO, this.localeLanguageService.getLanguage() == LanguageLocaleIdEnum.ITALIAN ? messageIt : messageEn, 'info', 'snackbarInfo');
  }

  private openSnackbar(type: SnackBarTypeEnum, message: string, icon: string, panelClass: string) {
    this._snackBar.openFromComponent(IconSnackbarComponent, {
      data: {
        type: type,
        icon: icon,
        message: message
      },
      panelClass: panelClass,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
