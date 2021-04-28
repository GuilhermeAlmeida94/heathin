import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaymentData } from '../fake-data/payment.data';
import { Payment } from '../interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  getByPatientId(patientId: string): Observable<Payment[]> {
    return of(PaymentData.filter(x => x.patient_id === patientId));
  }

}
