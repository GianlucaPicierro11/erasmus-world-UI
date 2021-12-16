import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoutesEnum } from 'app/enumerations/routes.enum';
import { LoginModel } from 'app/models/login-request.model';
import { AuthService } from 'app/services/auth/auth.service';
import { LoginSharedService } from 'app/services/login-shared/login-shared.service';
import { TokenStorageService } from 'app/services/token-storage/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  form: FormGroup;
  isLoggedIn = false;
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar, private loginSharedService: LoginSharedService) {
    this.form = fb.group({
      'email': new FormControl('', [Validators.required, Validators.email, Validators.minLength(6)]),
      'current-password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  login(): void {
    let loginRequest: LoginModel = {
      email: this.form.get("email")?.value,
      password: this.form.get("current-password")?.value
    };
    this.authService.login(loginRequest).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.roles = this.tokenStorage.getUser().roles;
      },
      error: (e) => {
        this._snackBar.open(e.error.error, "Close")
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
