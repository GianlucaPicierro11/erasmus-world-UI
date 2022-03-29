import { NgModule } from '@angular/core';

import { AppAccessRoutingModule, } from './app-access-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ConfirmRegistrationComponent,
  ],
  imports: [
    SharedModule,
    AppAccessRoutingModule
  ]
})

export class AppAccessModule { }
