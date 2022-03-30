import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthHttpService } from 'app/core/app-access/services/auth-http/auth-http.service';
import { SnackbarService } from 'app/core/app-access/services/snackbar/snackbar.service';

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
      'new-password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'match-password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.paramMap.get('user');
    this.token = this.route.snapshot.paramMap.get('token');
  }

  saveNewPassword() {

  }
}
