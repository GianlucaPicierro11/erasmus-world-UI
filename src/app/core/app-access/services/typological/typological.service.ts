import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { EsnSectionModel } from 'app/core/app-access/models/esnsection.model';
import { NationalityModel } from 'app/core/app-access/models/nationality.model';
import { UniversityModel } from 'app/core/app-access/models/university.model';
import { Observable } from 'rxjs';

const TYPOLOGICAL_URL_API = environment.BASE_URL_API + 'typological';
@Injectable({
  providedIn: 'root'
})
export class TypologicalService {

  constructor(private http: HttpClient) { }

  findAllEsnsections(): Observable<Array<EsnSectionModel>> {
    return this.http.get<Array<EsnSectionModel>>(`${TYPOLOGICAL_URL_API}/esnsections`);
  }

  findAllNationalities(): Observable<Array<NationalityModel>> {
    return this.http.get<Array<NationalityModel>>(`${TYPOLOGICAL_URL_API}/nationalities`);
  }

  findAllUniversities(univeristyName: string): Observable<Array<UniversityModel>> {
    return this.http.get<Array<UniversityModel>>(`${TYPOLOGICAL_URL_API}/universities/${univeristyName}`);
  }
}
