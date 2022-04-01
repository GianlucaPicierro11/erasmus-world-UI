import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewPasswordRequestModel } from '@core/app-access/models/new-password-request.model';
import { AuthHttpService } from 'app/core/app-access/services/auth-http/auth-http.service';
import { SnackbarService } from 'app/core/app-access/services/snackbar/snackbar.service';
import { RoutesEnum } from 'app/shared/enumerations/routes.enum';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  hideNewPassword = true;
  hideMatchPassword = true;
  user!: string | null;
  token!: string | null;
  form: FormGroup;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthHttpService, private snackbarService: SnackbarService, private router: Router) {
    this.form = fb.group({
      'new-password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!-_%*?&])[A-Za-z\d$@$!-_%*?&].{8,}'), Validators.maxLength(120)]),
      'match-password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!-_%*?&])[A-Za-z\d$@$!-_%*?&].{8,}'), Validators.maxLength(120)]),
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

  saveNewPassword() {
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
        this.snackbarService.openErrorSnackBar(e.error.error, e.error.error)
      },
      complete: () => {
      }
    });

  }
}
