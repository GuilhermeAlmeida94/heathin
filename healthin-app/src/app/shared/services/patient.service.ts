import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Patient } from '../interfaces/patient';

const patients: Patient[] = [
  {id: '1',
    name: 'Will',
    documentType: 'cpf',
    document: '87050602060',
    notification: 'email',
    email: 'test@gmail.com',
    phones: [
      { type: 'Home', number: '12121212' },
      { type: 'Cellphone', number: '34343434' }
    ]
  }  as Patient,
  {id: '2', name: 'Wanessa',
    documentType: 'cnpj',
    document: '11444777000161',
    notification: 'phones',
    phones: [
      { type: 'Cellphone', number: '34343434' } ]
  }  as Patient,
  {
    id: '3', name: 'Joanne',
    documentType: 'cnpj',
    document: '20458214000113'
  } as Patient,
  {id: '4', name: 'Michael', document: '4444444444444444'} as Patient,
  {id: '5', name: 'Jonh', document: '5555555555555555', email: 'test@gmail.com'} as Patient,
  {id: '6', name: 'Joan', document: '6666666666666666'} as Patient,
  {id: '7', name: 'Ester', document: '7777777777777777'} as Patient,
  {id: '9', name: 'Leslie', document: '9999999999999999'} as Patient,
  {id: '8', name: 'Taylor', document: '8888888888888888'} as Patient,
];

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }

  getByPatientId(patientId: string): Observable<Patient> {
    return of(patients.find(x => x.id === patientId));
  }

  getByName(name: string): Observable<Patient[]> {
    if (name && name !== '') {
      const lowerName = name.toLowerCase();
      return of(patients.filter(x => x.name.toLocaleLowerCase().includes(lowerName)));
    }
    else {
      return of(null);
    }
  }
}
