import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EsnSectionModel } from '@core/app-access/models/esnsection.model';
import { NationalityModel } from '@core/app-access/models/nationality.model';
import { UniversityModel } from '@core/app-access/models/university.model';
import { UserModel } from '@core/app-access/models/user.model';
import { AuthHttpService } from '@core/app-access/services/auth-http/auth-http.service';
import { LanguageLocaleIdEnum } from 'app/shared/enumerations/language-locale-id.enum';
import { LocaleLanguageService } from 'app/shared/services/locale-language/locale-language.service';
import { TokenStorageService } from 'app/shared/services/token-storage/token-storage.service';
import { TypologicalHttpService } from 'app/shared/services/typological-http/typological-http.service';
import * as moment from 'moment';
import { BehaviorSubject, debounceTime, finalize, map, Observable, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  form: FormGroup;
  isLoggedIn = false;
  startDate = new Date(1990, 0, 1);
  user$: Observable<UserModel> | undefined;
  isLoadingUniversities = false;
  nationalities: NationalityModel[] = [];
  filteredNationalities: Observable<NationalityModel[]> | undefined;
  universities: UniversityModel[] = [];
  filteredUniversities: UniversityModel[] | undefined;
  esnSections: EsnSectionModel[] = [];
  filteredEsnSections: Observable<EsnSectionModel[]> | undefined;

  constructor(private fb: FormBuilder, private localeLanguageService: LocaleLanguageService, private typologicalService: TypologicalHttpService,
    private authHttpService: AuthHttpService, private tokenStorageService: TokenStorageService) {
    this.form = fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      birthDate: new FormControl('', [Validators.required, this.dateValidator]),
      nationalitySearch: new FormControl(""),
      nationality: new FormControl(null, [Validators.required]),
      universitySearch: new FormControl(""),
      university: new FormControl(null, [Validators.required]),
      esnSectionSearch: new FormControl(""),
      esnSection: new FormControl(null, [Validators.required]),
      nrEsnCard: new FormControl('')
    });
  }

  getNameErrorMessage() {
    if (this.form.get('name')?.hasError('required')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Campo obbligatorio' : 'You must enter a value';
    }
    if (this.form.get('name')?.hasError('minlength')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Sono necessari almeno due caratteri' : 'You must enter at least two characters';
    }
    if (this.form.get('name')?.hasError('maxlength')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Non è possibile inserire più di 20 caratteri' : 'You must enter less than 20 caracters';
    }
    return '';
  }

  getSurnameErrorMessage() {
    if (this.form.get('surname')?.hasError('required')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Campo obbligatorio' : 'You must enter a value';
    }
    if (this.form.get('surname')?.hasError('minlength')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Sono necessari almeno due caratteri' : 'You must enter at least two characters';
    }
    if (this.form.get('surname')?.hasError('maxlength')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Non è possibile inserire più di 20 caratteri' : 'You must enter less than 20 caracters';
    }
    return '';
  }

  getEmailErrorMessage() {
    if (this.form.get('email')?.hasError('required')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Campo obbligatorio' : 'You must enter a value';
    }
    if (this.form.get('email')?.hasError('email')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Email non valida' : 'Not a valid email';
    }
    if (this.form.get('email')?.hasError('maxlength')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Non è possibile inserire più di 50 caratteri' : 'You must enter less than 50 caracters';
    }
    return '';
  }

  getPhoneErrorMessage() {
    if (this.form.get('phone')?.hasError('required')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Campo obbligatorio' : 'You must enter a value';
    }
    if (this.form.get('phone')?.hasError('minlength')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Sono necessari almeno sei caratteri' : 'You must enter at least six characters';
    }
    if (this.form.get('phone')?.hasError('maxlength')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Non è possibile inserire più di 50 caratteri' : 'You must enter less than 50 caracters';
    }
    return '';
  }

  getBirthDateErrorMessage() {
    if (this.form.get('birthDate')?.hasError('required')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Campo obbligatorio' : 'You must enter a value';
    }
    if (this.form.get('birthDate')?.hasError('invalidDate')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Sei nato nel futuro?' : 'Are you born in the future?';
    }
    return '';
  }

  dateValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (!date.isBefore(today)) {
        return { 'invalidDate': true }
      } else {
        return {}
      }
    }
    return {};
  }


  ngOnInit(): void {
    this.autocompleteOnNationality();
    this.autocompleteOnUniversity();
    this.autocompleteOnEsnSection();

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (!this.isLoggedIn) {
      //this.router.navigateByUrl(RoutesEnum.LOGIN);
    } else {
      this.authHttpService.getUserInfo(this.tokenStorageService.getUser()?.email, this.tokenStorageService.getToken()).subscribe(user => {
        this.form.patchValue(user);
        this.form.get("universitySearch")?.setValue(user.university.university);
      });

    }
  }

  attributeDisplay(attribute1: NationalityModel | UniversityModel | EsnSectionModel, attribute2: NationalityModel | UniversityModel | EsnSectionModel) {
    if (attribute1 != null && attribute1 != undefined && attribute2 != null && attribute2 != undefined) {
      return attribute1.id == attribute2.id;
    }
    return false;
  }

  private autocompleteOnNationality() {
    this.typologicalService.findAllNationalities().pipe(
      finalize(() => {
        this.filteredNationalities = this.form.get('nationalitySearch')?.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.nationality)),
          map(nationality => (nationality ? this._filterNationalities(nationality) : this.nationalities.slice()))
        );
      })
    ).subscribe((nationalities: NationalityModel[]) => this.nationalities = nationalities);
  }

  private autocompleteOnUniversity() {
    this.form.get('universitySearch')?.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        tap(() => this.isLoadingUniversities = true),
        switchMap(value => value && value.length > 0 ? this.typologicalService.findAllUniversities(value).pipe(
          finalize(() => this.isLoadingUniversities = false)) : this.returnEmptyList()))
      .subscribe(result => {
        this.filteredUniversities = result.filter(el =>
          !this.universities.find((univeristy: any) => {
            return univeristy.univeristy === univeristy.univeristy;
          })
        );
      });
  }

  private autocompleteOnEsnSection() {
    this.typologicalService.findAllEsnsections().pipe(
      finalize(() => {
        this.filteredEsnSections = this.form.get('esnSectionSearch')?.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.section)),
          map(section => (section ? this._filterEsnSections(section) : this.esnSections.slice()))
        );
      })
    ).subscribe((esnSections: EsnSectionModel[]) => this.esnSections = esnSections);
  }

  private returnEmptyList(): Observable<Array<any>> {
    let empty = new BehaviorSubject<any[]>([]);
    this.isLoadingUniversities = false;
    return empty;
  }

  private _filterNationalities(nationality: string): NationalityModel[] {
    const filterValue = nationality.toLowerCase();

    return this.nationalities.filter(nationality =>
      nationality.nationality.toLowerCase().includes(filterValue)
    );
  }

  private _filterEsnSections(section: string): EsnSectionModel[] {
    const filterValue = section.toLowerCase();

    return this.esnSections.filter(esnSection => esnSection.section.toLowerCase().includes(filterValue));
  }

  save() {

  }
}
