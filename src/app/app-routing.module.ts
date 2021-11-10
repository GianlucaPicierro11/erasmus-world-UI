import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: "", redirectTo: 'home-page', pathMatch: 'full' },
      { path: 'en', redirectTo: 'home-page', pathMatch: 'full' },
      { path: 'home-page', pathMatch: 'full', component: HomepageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
