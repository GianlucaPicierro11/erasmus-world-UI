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
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UnauthorizedPageComponent } from './components/unauthorized-page/unauthorized-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { FlagsLanguageSelectComponent } from './components/flags-language-select/flags-language-select.component';
import { IconSnackbarComponent } from './components/icon-snackbar/icon-snackbar.component';
import { LoadingButtonDirective } from './directives/loading-button.directive';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingSelectDirective } from './directives/loading-select.directive';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImgUploadComponent } from './components/img-upload/img-upload.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ImgUploadDialogComponent } from './components/img-upload-dialog/img-upload-dialog.component';

@NgModule({
  declarations: [
    UnauthorizedPageComponent,
    PageNotFoundComponent,
    FlagsLanguageSelectComponent,
    IconSnackbarComponent,
    LoadingButtonDirective,
    LoadingSelectDirective,
    ImgUploadComponent,
    ImgUploadDialogComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({ cookieName: 'XSRF-TOKEN' }),
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
    MatProgressBarModule,
    ImageCropperModule,
    MatDialogModule,
  ],
  exports: [
    //imports
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule,
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
    MatProgressBarModule,
    ImageCropperModule,
    MatDialogModule,
    //declarations
    UnauthorizedPageComponent,
    PageNotFoundComponent,
    FlagsLanguageSelectComponent,
    IconSnackbarComponent,
    LoadingButtonDirective,
    LoadingSelectDirective,
    ImgUploadComponent,
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
