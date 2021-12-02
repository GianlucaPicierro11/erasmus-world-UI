import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerSharedService } from './services/spinner-shared/spinner-shared.service';
import { SpinnerInterceptor } from './interceptors/spinner/spinner.interceptor';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    BoardModeratorComponent,
    SpinnerComponent,
    ConfirmRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  providers: [SpinnerSharedService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
