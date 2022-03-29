import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appAccessRoutes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(appAccessRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppAccessRoutingModule {
}
