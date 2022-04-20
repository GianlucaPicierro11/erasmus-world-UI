import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewPasswordRequestModel } from '@core/app-access/models/new-password-request.model';
import { LocaleLanguageService } from 'app/shared/services/locale-language/locale-language.service';
import { environment } from '@env/environment';
import { AuthHttpService } from 'app/core/app-access/services/auth-http/auth-http.service';
import { SnackbarService } from 'app/shared/services/snackbar/snackbar.service';
import { LanguageLocaleIdEnum } from 'app/shared/enumerations/language-locale-id.enum';
import { RoutesEnum } from 'app/shared/enumerations/routes.enum';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  logoPath: string = environment.BASE_URL_UI + 'assets/images/ME_full.png';
  hideNewPassword = true;
  hideMatchPassword = true;
  user!: string | null;
  token!: string | null;
  form: FormGroup;
  isSavingNewPassword = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthHttpService, private snackbarService: SnackbarService,
    private router: Router, private localeLanguageService: LocaleLanguageService) {
    this.form = fb.group({
      'new-password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.maxLength(120)]),
      'match-password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.maxLength(120)]),
    }, { validators: this.checkPasswords });
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.paramMap.get('user');
    this.token = this.route.snapshot.paramMap.get('token');
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('new-password')?.value;
    let confirmPass = group.get('match-password')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  getPasswordErrorMessage() {
    if (this.form.get('new-password')?.hasError('required')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Campo obbligatorio' : 'You must enter a value';
    }
    if (this.form.get('new-password')?.hasError('minlength')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Sono necessari almeno otto caratteri' : 'You must enter at least eight characters';
    }
    if (this.form.get('new-password')?.hasError('maxlength')) {
      return this.localeLanguageService.getLanguage() === LanguageLocaleIdEnum.ITALIAN ? 'Non è possibile inserire più di 120 caratteri' : 'You must enter less than 120 caracters';
    }
    if (this.form.get('new-password')?.hasError('pattern')) {
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

  saveNewPassword() {
    this.isSavingNewPassword = true;
    let newPasswordRequest: NewPasswordRequestModel = {
      password: this.form.get("new-password")?.value,
      token: this.token!,
      userId: Number(this.user!),
    };
    this.authService.saveNewPassword(newPasswordRequest).subscribe({
      next: (confirmation) => {
        if (confirmation) {
          this.snackbarService.openSuccessSnackBar("Password updated", "Password aggiornata");
          this.router.navigateByUrl(RoutesEnum.LOGIN);
        }
      },
      error: (e) => {
        this.snackbarService.openErrorSnackBar(e.error.error, e.error.error);
        this.isSavingNewPassword = false;
      },
      complete: () => {
        this.isSavingNewPassword = false;
      }
    });

  }
}
