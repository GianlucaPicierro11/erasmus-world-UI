import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';

@Component({
  selector: 'app-resend-email-verification',
  templateUrl: './resend-email-verification.component.html',
  styleUrls: ['./resend-email-verification.component.css']
})
export class ResendEmailVerificationComponent implements OnInit {

  logoPath: string = environment.BASE_URL_UI + 'assets/images/ESN_full-logo-Satellite.png';
  email: string | null;

  constructor(private route: ActivatedRoute) {
    this.email = this.route.snapshot.paramMap.get('email');
  }

  ngOnInit(): void {

  }

  resendConfirmEmail() {

  }
}
