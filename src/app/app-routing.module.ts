import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RoutesEnum } from './enumerations/routes.enum';

const routes: Routes = [
  { path: RoutesEnum.HOME, component: HomeComponent },
  { path: RoutesEnum.LOGIN, component: LoginComponent },
  { path: RoutesEnum.REGISTER, component: RegisterComponent },
  { path: RoutesEnum.PROFILE, component: ProfileComponent },
  { path: RoutesEnum.USER, component: BoardUserComponent },
  { path: RoutesEnum.MOD, component: BoardModeratorComponent },
  { path: RoutesEnum.ADMIN, component: BoardAdminComponent },
  { path: '', redirectTo: RoutesEnum.HOME, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
