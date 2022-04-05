import { Injectable } from '@angular/core';
import { LanguageLocaleIdEnum } from 'app/shared/enumerations/language-locale-id.enum';

@Injectable({
  providedIn: 'root'
})
export class LocaleLanguageService {

  private language: string = navigator.language != LanguageLocaleIdEnum.ITALIAN && navigator.language != 'it-IT' ? LanguageLocaleIdEnum.ENGLISH : LanguageLocaleIdEnum.ITALIAN;

  constructor() { }

  getLanguage(): string {
    return this.language;
  }

  setLanguage(language: string) {
    this.language = language;
  }

}
