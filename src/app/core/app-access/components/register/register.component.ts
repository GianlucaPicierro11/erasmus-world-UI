import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesEnum } from 'app/shared/enumerations/routes.enum';
import { EsnSectionModel } from 'app/core/app-access/models/esnsection.model';
import { NationalityModel } from 'app/core/app-access/models/nationality.model';
import { SignupRequestModel } from 'app/core/app-access/models/signup-request.model';
import { UniversityModel } from 'app/core/app-access/models/university.model';
import { AuthHttpService } from 'app/core/app-access/services/auth-http/auth-http.service';
import { SnackbarService } from 'app/shared/services/snackbar/snackbar.service';
import { TypologicalHttpService } from 'app/shared/services/typological-http/typological-http.service';
import { BehaviorSubject, debounceTime, finalize, map, Observable, startWith, switchMap, tap } from 'rxjs';
import * as moment from 'moment';
import { environment } from '@env/environment';
import { LocaleLanguageService } from 'app/shared/services/locale-language/locale-language.service';
import { LanguageLocaleIdEnum } from 'app/shared/enumerations/language-locale-id.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  hidePassword = true;
  hideMatchPassword = true;
  startDate = new Date(1990, 0, 1);
  logoPath: string = environment.BASE_URL_UI + 'assets/images/ME_full_black.png';

  isLoadingNationalities = false;
  nationalities: NationalityModel[] = [];
  filteredNationalities: Observable<NationalityModel[]> | undefined;
  isLoadingUniversities = false;
  universities: UniversityModel[] = [];
  filteredUniversities: UniversityModel[] | undefined;
  isLoadingEsnSections = false;
  esnSections: EsnSectionModel[] = [];
  filteredEsnSections: Observable<EsnSectionModel[]> | undefined;

  isRegistering = false;

  constructor(private authService: AuthHttpService, private fb: FormBuilder, private snackbarService: SnackbarService,
    private typologicalService: TypologicalHttpService, private router: Router, private localeLanguageService: LocaleLanguageService) {
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
      nrEsnCard: new FormControl(''),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.maxLength(120)]),
      'match-password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.maxLength(120)]),
    }, { validators: this.checkPasswords });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('match-password')?.value

    return pass === confirmPass ? null : { notSame: true }
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

  getPasswordErrorMessage() {
    if (this.form.get('password')?.hasError('required')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Campo obbligatorio' : 'You must enter a value';
    }
    if (this.form.get('password')?.hasError('minlength')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Sono necessari almeno otto caratteri' : 'You must enter at least eight characters';
    }
    if (this.form.get('password')?.hasError('maxlength')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Non è possibile inserire più di 120 caratteri' : 'You must enter less than 120 caracters';
    }
    if (this.form.get('password')?.hasError('pattern')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Password non valida' : 'Not a valid password';
    }
    return '';
  }

  getMatchPasswordErrorMessage() {
    if (this.form.get('match-password')?.hasError('required')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Campo obbligatorio' : 'You must enter a value';
    }
    if (this.form?.hasError('notSame')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Le password non combaciano' : 'Passwords do not match';
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
  }

  private autocompleteOnNationality() {
    this.isLoadingNationalities = true;
    this.typologicalService.findAllNationalities().pipe(
      finalize(() => {
        this.filteredNationalities = this.form.get('nationalitySearch')?.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.nationality)),
          map(nationality => (nationality ? this._filterNationalities(nationality) : this.nationalities.slice()))
        );
        this.isLoadingNationalities = false;
      })
    ).subscribe((nationalities: NationalityModel[]) => this.nationalities = nationalities);
  }

  private autocompleteOnUniversity() {
    this.isLoadingUniversities = true;
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
            return univeristy.univeristy === el.univeristy;
          })
        );
      });
  }

  private autocompleteOnEsnSection() {
    this.isLoadingEsnSections = true;
    this.typologicalService.findAllEsnsections().pipe(
      finalize(() => {
        this.filteredEsnSections = this.form.get('esnSectionSearch')?.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.section)),
          map(section => (section ? this._filterEsnSections(section) : this.esnSections.slice()))
        );
        this.isLoadingEsnSections = false;
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

  register(): void {
    this.isRegistering = true;

    let signupRequest: SignupRequestModel = {
      name: this.form.get("name")?.value,
      surname: this.form.get("surname")?.value,
      email: this.form.get("email")?.value,
      phone: this.form.get("phone")?.value,
      birthDate: this.form.get("birthDate")?.value,
      nationalityId: this.form.get("nationality")?.value.id,
      universityId: this.form.get("university")?.value.id,
      esnSectionId: this.form.get("esnSection")?.value.id,
      nrEsnCard: this.form.get("nrEsnCard")?.value,
      password: this.form.get("password")?.value
    };

    this.authService.register(signupRequest).subscribe({
      next: (data) => {
        if (data) {
          this.snackbarService.openSuccessSnackBar("Registered successfully, please check your email and confirm your account", "Ti sei registrato correttamente, per favore controlla la tua e-mail per confermare il tuo account");
          this.router.navigateByUrl(RoutesEnum.RESEND_EMAIL_VERIFICATION.replace(':email', signupRequest.email));
        }
      },
      error: (e) => {
        this.snackbarService.openErrorSnackBar(e.error.error, e.error.error);
        this.isRegistering = false;
      },
      complete: () => {
        this.isRegistering = false;
      }
    });
  }

  goToLogin() {
    this.router.navigateByUrl(RoutesEnum.LOGIN);
  }

  goToTerms() {
    this.router.navigateByUrl(RoutesEnum.TERM_OF_USE);
  }

  goToDataPolicy() {
    this.router.navigateByUrl(RoutesEnum.DATA_POLICY);
  }

  goToCookiesPolicy() {
    this.router.navigateByUrl(RoutesEnum.COOKIES_POLICY);
  }

}
