import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
      { path: RoutesEnum.CONFIRM_REGISTRATION, component: ConfirmRegistrationComponent },

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
