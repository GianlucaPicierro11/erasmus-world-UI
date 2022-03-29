import { NgModule } from '@angular/core';
import { AppAccessModule } from './app-access/app-access.module';

@NgModule({
  declarations: [
  ],
  imports: [
    AppAccessModule
  ]
})
/**
 *when using a Core Module:
 *- DO import modules that should be instantiated once in your app.
 *- DO place services in the module, but do not provide them.
 *- DO NOT declare components, pipes, directives.
 *- DO NOT import the CoreModule into any modules other than the AppModule.
 *
 * @export
 * @class CoreModule
 */
export class CoreModule { }
