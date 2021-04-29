import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PaymentData } from '../fake-data/payment.data';
import { PaginatedData } from '../interfaces/pagination/paginated-data';
import { Page, PageRequest } from '../interfaces/pagination/page';
import { Payment } from '../interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  private filterData = (patientId: string) =>
    PaymentData
      .filter(x => x.patientId === patientId)
      .sort((a, b) => a.expirationDate > b.expirationDate ? -1 : 0)

  getByPatientId(patientId: string): Observable<Payment[]> {
    return of(this.filterData(patientId));
  }

  getByPatientIdPaginated(patientId: string, request: PageRequest<Payment>): Observable<Page<Payment>> {
    let filteredPayment = this.filterData(patientId);
    filteredPayment = [...filteredPayment].sort((a, b) => {
      const propA = a[request.sort.property];
      const propB = b[request.sort.property];
      let result;
      if (typeof propA === 'string') {
        result = propA.toLowerCase().localeCompare(propB.toString().toLowerCase());
      } else {
        result = propA as any - (propB as any);
      }
      const factor = request.sort.order === 'asc' ? 1 : -1;
      return result * factor;
    });
    const start = request.page * request.size;
    const end = start + request.size;
    const pagePayment = filteredPayment.slice(start, end);
    const page = {
      content: pagePayment,
      number: request.page,
      size: request.size,
      totalElements: filteredPayment.length
    } as PaginatedData<Payment>;
    return of(page).pipe(delay(500));
  }

}
