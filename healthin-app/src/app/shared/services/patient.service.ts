import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Patient } from '../interfaces/patient';

const patients: Patient[] = [
  {id: '1', name: 'Will', document: '1111111111111111'},
  {id: '2', name: 'Wanessa', document: '2222222222222222'},
  {id: '3', name: 'Joanne', document: '3333333333333333'},
  {id: '4', name: 'Michael', document: '4444444444444444'},
  {id: '5', name: 'Jonh', document: '5555555555555555'},
  {id: '6', name: 'Joan', document: '6666666666666666'},
  {id: '7', name: 'Ester', document: '7777777777777777'},
  {id: '9', name: 'Leslie', document: '9999999999999999'},
  {id: '8', name: 'Taylor', document: '8888888888888888'},
]

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }

  getAll(): Observable<Patient[]> {
    return of(patients).pipe(delay(0));
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
