import { NgModule } from '@angular/core';

import { AppAccessRoutingModule, } from './app-access-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { SharedModule } from 'app/shared/shared.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ConfirmRegistrationComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent
  ],
  imports: [
    SharedModule,
    AppAccessRoutingModule
  ]
})

export class AppAccessModule { }
