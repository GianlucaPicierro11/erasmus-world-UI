import { NgModule } from '@angular/core';

import { AppAccessRoutingModule, } from './app-access-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { SharedModule } from 'app/shared/shared.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { TermOfUseComponent } from './components/term-of-use/term-of-use.component';
import { DataPolicyComponent } from './components/data-policy/data-policy.component';
import { CookiesPolicyComponent } from './components/cookies-policy/cookies-policy.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ResendEmailVerificationComponent } from './components/resend-email-verification/resend-email-verification.component';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ConfirmRegistrationComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    TermOfUseComponent,
    DataPolicyComponent,
    CookiesPolicyComponent,
    EditProfileComponent,
    ResendEmailVerificationComponent,
    DeleteAccountComponent
  ],
  imports: [
    SharedModule,
    AppAccessRoutingModule
  ]
})

export class AppAccessModule { }
