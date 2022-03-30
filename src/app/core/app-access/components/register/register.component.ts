import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesEnum } from 'app/shared/enumerations/routes.enum';
import { EsnSectionModel } from 'app/core/app-access/models/esnsection.model';
import { NationalityModel } from 'app/core/app-access/models/nationality.model';
import { SignupRequestModel } from 'app/core/app-access/models/signup-request.model';
import { UniversityModel } from 'app/core/app-access/models/university.model';
import { AuthHttpService } from 'app/core/app-access/services/auth-http/auth-http.service';
import { SnackbarService } from 'app/core/app-access/services/snackbar/snackbar.service';
import { TypologicalService } from 'app/core/app-access/services/typological/typological.service';
import { BehaviorSubject, debounceTime, finalize, map, Observable, startWith, switchMap, tap } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  hide = true;
  startDate = new Date(1990, 0, 1);
  isLoadingUniversities = false;

  nationalities: NationalityModel[] = [];
  filteredNationalities: Observable<NationalityModel[]> | undefined;
  universities: UniversityModel[] = [];
  filteredUniversities: UniversityModel[] | undefined;
  esnSections: EsnSectionModel[] = [];
  filteredEsnSections: Observable<EsnSectionModel[]> | undefined;

  constructor(private authService: AuthHttpService, private fb: FormBuilder, private snackbarService: SnackbarService,
    private typologicalService: TypologicalService, private router: Router) {
    this.form = fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      birthDate: new FormControl('', [Validators.required, this.dateValidator]),
      nationalitySearch: new FormControl(""),
      nationality: new FormControl(null, [Validators.required]),
      universitySearch: new FormControl(""),
      university: new FormControl(null, [Validators.required]),
      esnSectionSearch: new FormControl(""),
      esnSection: new FormControl(null, [Validators.required]),
      nrEsnCard: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(120)]),
    });
  }

  dateValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (!date.isBefore(today)) {
        return { 'invalidDate': true }
      } else {
        return {}
      }
    }
    return {};
  }

  ngOnInit(): void {
    this.autocompleteOnNationality();
    this.autocompleteOnUniversity();
    this.autocompleteOnEsnSection();
  }

  private autocompleteOnNationality() {
    this.typologicalService.findAllNationalities().pipe(
      finalize(() => {
        this.filteredNationalities = this.form.get('nationalitySearch')?.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.nationality)),
          map(nationality => (nationality ? this._filterNationalities(nationality) : this.nationalities.slice()))
        );
      })
    ).subscribe((nationalities: NationalityModel[]) => this.nationalities = nationalities);
  }

  private autocompleteOnUniversity() {
    this.form.get('universitySearch')?.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        tap(() => this.isLoadingUniversities = true),
        switchMap(value => value && value.length > 0 ? this.typologicalService.findAllUniversities(value).pipe(
          finalize(() => this.isLoadingUniversities = false)) : this.returnEmptyList()))
      .subscribe(result => {
        this.filteredUniversities = result.filter(el =>
          !this.universities.find((univeristy: any) => {
            return univeristy.univeristy === univeristy.univeristy;
          })
        );
      });
  }

  private autocompleteOnEsnSection() {
    this.typologicalService.findAllEsnsections().pipe(
      finalize(() => {
        this.filteredEsnSections = this.form.get('esnSectionSearch')?.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.section)),
          map(section => (section ? this._filterEsnSections(section) : this.esnSections.slice()))
        );
      })
    ).subscribe((esnSections: EsnSectionModel[]) => this.esnSections = esnSections);
  }

  private returnEmptyList(): Observable<Array<any>> {
    let empty = new BehaviorSubject<any[]>([]);
    this.isLoadingUniversities = false;
    return empty;
  }

  private _filterNationalities(nationality: string): NationalityModel[] {
    const filterValue = nationality.toLowerCase();

    return this.nationalities.filter(nationality =>
      nationality.nationality.toLowerCase().includes(filterValue)
    );
  }

  private _filterEsnSections(section: string): EsnSectionModel[] {
    const filterValue = section.toLowerCase();

    return this.esnSections.filter(esnSection => esnSection.section.toLowerCase().includes(filterValue));
  }

  register(): void {
    let signupRequest: SignupRequestModel = {
      name: this.form.get("name")?.value,
      surname: this.form.get("surname")?.value,
      email: this.form.get("email")?.value,
      phone: this.form.get("phone")?.value,
      birthDate: this.form.get("birthDate")?.value,
      nationalityId: this.form.get("nationality")?.value.id,
      universityId: this.form.get("university")?.value.id,
      esnSectionId: this.form.get("esnSection")?.value.id,
      nrEsnCard: this.form.get("nrEsnCard")?.value,
      password: this.form.get("password")?.value
    };

    this.authService.register(signupRequest).subscribe({
      next: (data) => {
        if (data) {
          this.snackbarService.openSuccessSnackBar("Registered successfully, please check your email and confirm your account", "Ti sei registrato correttamente, per favore controlla la tua e-mail per confermare il tuo account")
          this.router.navigateByUrl(RoutesEnum.LOGIN);
        }
      },
      error: (e) => {
        this.snackbarService.openErrorSnackBar(e.error.error, e.error.error)
      },
      complete: () => {
        this.router.navigateByUrl(RoutesEnum.LOGIN);
      }
    });
  }

}
