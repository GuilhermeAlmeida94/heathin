import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Patient } from '../interfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getByPatientId(patientId: string): Observable<Patient> {
    return this.http.get<Patient>(`api/patients/${patientId}`);
  }

  getByName(name: string): Observable<Patient[]> {
    if (name && name !== '') {
      const lowerName = name.toLowerCase();
      return this.http.get<Patient[]>('api/patients')
        .pipe(
          map(patients => patients.filter(patient => patient.name.toLocaleLowerCase().includes(lowerName)))
        );
    }
    else {
      return of(null);
    }
  }
}
