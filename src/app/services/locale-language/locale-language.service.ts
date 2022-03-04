import { Injectable } from '@angular/core';
import { LanguageLocaleIdEnum } from 'app/enumerations/language-locale-id.enum';

@Injectable({
  providedIn: 'root'
})
export class LocaleLanguageService {

  private language: string = navigator.language != LanguageLocaleIdEnum.ITALIAN ? LanguageLocaleIdEnum.ENGLISH : LanguageLocaleIdEnum.ITALIAN;

  constructor() { }

  getLanguage(): string {
    return this.language;
  }

  setLanguage(language: string) {
    this.language = language;
  }

}
