import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { LanguageModel } from '@core/app-access/models/language.model';
import { LocaleLanguageService } from '@core/app-access/services/locale-language/locale-language.service';
import { environment } from '@env/environment';
import { LanguageFlagPathEnum } from 'app/shared/enumerations/language-flag-path.enum';
import { LanguageLocaleIdEnum } from 'app/shared/enumerations/language-locale-id.enum';

@Component({
  selector: 'app-flags-language-select',
  templateUrl: './flags-language-select.component.html',
  styleUrls: ['./flags-language-select.component.css'],
})
export class FlagsLanguageSelectComponent implements OnInit {

  @ViewChild('flags', { static: false })
  flagsSelect!: MatMenu;

  languageSelected: LanguageModel;
  languages: Array<LanguageModel> = [
    { localeId: LanguageLocaleIdEnum.ENGLISH, flagPath: this.getLanguagePath(LanguageFlagPathEnum.ENGLISH) },
    { localeId: LanguageLocaleIdEnum.ITALIAN, flagPath: this.getLanguagePath(LanguageFlagPathEnum.ITALIAN) }
  ];

  constructor(private localeLanguageService: LocaleLanguageService) {
    if (window.location.href.includes(`/${LanguageLocaleIdEnum.ITALIAN}`)) {
      this.languageSelected = { localeId: LanguageLocaleIdEnum.ITALIAN, flagPath: this.getLanguagePath(LanguageFlagPathEnum.ITALIAN) }
      this.localeLanguageService.setLanguage(LanguageLocaleIdEnum.ITALIAN);
    } else {
      this.languageSelected = { localeId: LanguageLocaleIdEnum.ENGLISH, flagPath: this.getLanguagePath(LanguageFlagPathEnum.ENGLISH) };
      this.localeLanguageService.setLanguage(LanguageLocaleIdEnum.ENGLISH);
    }

  }

  ngOnInit(): void {
  }

  private getLanguagePath(languageFlagPathEnum: LanguageFlagPathEnum): string {
    return environment.BASE_URL_UI + languageFlagPathEnum;
  }

  onSelect(languageFlagPath: LanguageModel) {
    let previusLanguageSelected = this.languageSelected;
    this.languageSelected = languageFlagPath;
    this.localeLanguageService.setLanguage(languageFlagPath.localeId);
    window.location.assign(window.location.href.replace(previusLanguageSelected.localeId, languageFlagPath.localeId));
  }
}
