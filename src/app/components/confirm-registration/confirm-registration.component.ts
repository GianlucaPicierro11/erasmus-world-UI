import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit {
  user!: string | null;
  token!: string | null;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.paramMap.get('user');
    this.token = this.route.snapshot.paramMap.get('token');
    this.authService.confirm(this.user, this.token).subscribe(result => console.log(result));
  }

}
