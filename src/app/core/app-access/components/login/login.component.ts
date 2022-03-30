import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesEnum } from 'app/shared/enumerations/routes.enum';
import { LoginModel } from 'app/core/app-access/models/login-request.model';
import { AuthHttpService } from 'app/core/app-access/services/auth-http/auth-http.service';
import { LoginSharedService } from 'app/core/app-access/services/login-shared/login-shared.service';
import { SnackbarService } from 'app/core/app-access/services/snackbar/snackbar.service';
import { TokenStorageService } from 'app/core/app-access/services/token-storage/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  form: FormGroup;

  constructor(private authService: AuthHttpService, private tokenStorage: TokenStorageService,
    private fb: FormBuilder, private router: Router, private loginSharedService: LoginSharedService, private snackbarService: SnackbarService) {
    this.form = fb.group({
      'email': new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]),
      'current-password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.snackbarService.openInfoSnackWarn("You are already logged in", "Sei già loggato");
      this.router.navigateByUrl(RoutesEnum.HOME);
    }
  }

  login(): void {
    let loginRequest: LoginModel = {
      email: this.form.get("email")?.value,
      password: this.form.get("current-password")?.value
    };
    this.authService.login(loginRequest).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
      },
      error: (e) => {
        this.snackbarService.openErrorSnackBar(e.error.error, e.error.error)
        this.loginSharedService.pushIsLoggedIn(false);
        this.loginSharedService.pushIsLoggedOut(true);
      },
      complete: () => {
        this.loginSharedService.pushIsLoggedIn(true);
        this.loginSharedService.pushIsLoggedOut(false);
        this.router.navigateByUrl(RoutesEnum.HOME);
      }
    });
  }

  goToRegistration() {
    this.router.navigateByUrl(RoutesEnum.REGISTER)
  }
}
