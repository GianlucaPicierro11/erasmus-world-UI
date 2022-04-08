import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UnauthorizedPageComponent } from './components/unauthorized-page/unauthorized-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { FlagsLanguageSelectComponent } from './components/flags-language-select/flags-language-select.component';
import { IconSnackbarComponent } from './components/icon-snackbar/icon-snackbar.component';

@NgModule({
  declarations: [
    UnauthorizedPageComponent,
    PageNotFoundComponent,
    FlagsLanguageSelectComponent,
    IconSnackbarComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    CommonModule,
    MatTooltipModule,
    MatListModule,
  ],
  exports: [
    //imports
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    CommonModule,
    MatTooltipModule,
    MatListModule,
    //declarations
    UnauthorizedPageComponent,
    PageNotFoundComponent,
    FlagsLanguageSelectComponent,
    IconSnackbarComponent
  ]
})

/**
 *when using a Shared Module:
 *- DO declare components, pipes, directives, and export them.
 *- DO import FormsModule, ReactiveFormsModule and other (3rd-party) modules you need.
 *- DO import the SharedModule into any other Feature Modules.
 *- DO NOT provide app-wide singleton services in your SharedModule. Instead move these to the CoreModule.
 *- DO NOT import the SharedModule into the AppModule.
 *
 * @export
 * @class SharedModule
 */
export class SharedModule { }
