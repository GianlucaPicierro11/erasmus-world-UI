import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookiesPolicyComponent } from '@core/app-access/components/cookies-policy/cookies-policy.component';
import { DataPolicyComponent } from '@core/app-access/components/data-policy/data-policy.component';
import { DeleteAccountComponent } from '@core/app-access/components/delete-account/delete-account.component';
import { EditProfileComponent } from '@core/app-access/components/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from '@core/app-access/components/forgot-password/forgot-password.component';
import { ResendEmailVerificationComponent } from '@core/app-access/components/resend-email-verification/resend-email-verification.component';
import { TermOfUseComponent } from '@core/app-access/components/term-of-use/term-of-use.component';
import { UpdatePasswordComponent } from '@core/app-access/components/update-password/update-password.component';
import { ConfirmRegistrationComponent } from './core/app-access/components/confirm-registration/confirm-registration.component';
import { HomeComponent } from './core/app-access/components/home/home.component';
import { LoginComponent } from './core/app-access/components/login/login.component';
import { RegisterComponent } from './core/app-access/components/register/register.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { UnauthorizedPageComponent } from './shared/components/unauthorized-page/unauthorized-page.component';

import { RoutesEnum } from './shared/enumerations/routes.enum';

const appRoutes: Routes = [
  {
    path: '',
    data: {
      enLabel: ['Home'],
      icon: ['pi pi-home']
    },
    children: [
      { path: "", redirectTo: RoutesEnum.HOME, pathMatch: 'full' },
      { path: RoutesEnum.HOME, component: HomeComponent },
      { path: RoutesEnum.LOGIN, component: LoginComponent },
      { path: RoutesEnum.REGISTER, component: RegisterComponent },
      { path: RoutesEnum.RESEND_EMAIL_VERIFICATION, component: ResendEmailVerificationComponent },
      { path: RoutesEnum.CONFIRM_REGISTRATION, component: ConfirmRegistrationComponent },
      { path: RoutesEnum.FORGOT_PASSWORD, component: ForgotPasswordComponent },
      { path: RoutesEnum.UPDATE_PASSWORD, component: UpdatePasswordComponent },
      { path: RoutesEnum.TERM_OF_USE, component: TermOfUseComponent },
      { path: RoutesEnum.DATA_POLICY, component: DataPolicyComponent },
      { path: RoutesEnum.COOKIES_POLICY, component: CookiesPolicyComponent },
      { path: RoutesEnum.EDIT_PROFILE, component: EditProfileComponent },
      { path: RoutesEnum.DELETE_ACCOUNT, component: DeleteAccountComponent },

      { path: 'unauthorized', pathMatch: 'full', component: UnauthorizedPageComponent },
      { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
    ]
  },
  { path: '', redirectTo: RoutesEnum.HOME, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
