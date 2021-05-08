import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, filter, map, skip, take, tap } from 'rxjs/operators';
import { PaginatedData } from '../interfaces/pagination/paginated-data';
import { Page, PageRequest } from '../interfaces/pagination/page';
import { Payment } from '../interfaces/payment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  private filterData$ = (patientId: string) =>
    this.http.get<Payment[]>(`api/payments?patientId=${patientId}`)
      .pipe(
        map(payments =>
          payments.sort((a, b) => a.expirationDate > b.expirationDate ? -1 : 0)
        )
      )

  getByPatientId(patientId: string, skipValue?: number, takeValue?: number): Observable<Payment[]> {
    skipValue = skipValue || 0;
    takeValue = takeValue || 0;
    return this.filterData$(patientId)
      .pipe(
        map(payments =>
          payments.slice(skipValue, takeValue + skipValue))
      );
  }
}
