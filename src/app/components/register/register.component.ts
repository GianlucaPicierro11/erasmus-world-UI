import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupRequestModel } from 'app/models/signup-request.model';
import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  hide = true;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.form = fb.group({
      'name': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      'surname': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      'email': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      'phone': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      'birthDate': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'nationality': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      'studentAt': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      'esnSection': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      'nrEsnCard': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(120)]),
    });
  }

  ngOnInit(): void {
  }

  register(): void {
    let signupRequest: SignupRequestModel = {
      name: this.form.get("name")?.value,
      surname: this.form.get("surname")?.value,
      email: this.form.get("email")?.value,
      phone: this.form.get("phone")?.value,
      birthDate: this.form.get("birthDate")?.value,
      nationality: this.form.get("nationality")?.value,
      studentAt: this.form.get("studentAt")?.value,
      esnSection: this.form.get("esnSection")?.value,
      nrEsnCard: this.form.get("nrEsnCard")?.value,
      password: this.form.get("password")?.value
    };

    this.authService.register(signupRequest).subscribe({
      next: (data) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (e) => {
        this._snackBar.open(e.error.error, "Close")
        this.isSignUpFailed = true;
      }
    });
  }

}
