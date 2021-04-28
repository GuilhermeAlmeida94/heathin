import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PatientData } from '../fake-data/patient.data';
import { Patient } from '../interfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }

  getByPatientId(patientId: string): Observable<Patient> {
    return of(PatientData.find(x => x.id === patientId));
  }

  getByName(name: string): Observable<Patient[]> {
    if (name && name !== '') {
      const lowerName = name.toLowerCase();
      return of(PatientData.filter(x => x.name.toLocaleLowerCase().includes(lowerName)));
    }
    else {
      return of(null);
    }
  }
}
