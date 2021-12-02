import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoutesEnum } from 'app/enumerations/routes.enum';
import { LoginModel } from 'app/models/login-request.model';
import { AuthService } from 'app/services/auth/auth.service';
import { TokenStorageService } from 'app/services/token-storage/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) {
    this.form = fb.group({
      'email': new FormControl('', [Validators.required, Validators.minLength(6)]),
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

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
      },
      error: (e) => {
        this._snackBar.open(e.error.error, "Close")
        this.isLoginFailed = true;
      },
      complete: () => this.router.navigateByUrl(RoutesEnum.HOME)
    });
  }

  goToRegistration() {
    this.router.navigateByUrl(RoutesEnum.REGISTER)
  }
}
