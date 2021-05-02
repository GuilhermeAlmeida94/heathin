import { Input, Component, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedData } from 'src/app/shared/interfaces/pagination/paginated-data';
import { Payment } from 'src/app/shared/interfaces/payment';
import { PaymentSelected } from 'src/app/shared/interfaces/payment-selected';
import { PaginatedDataSource } from 'src/app/shared/paginated-data-source';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsComponent implements OnChanges {
  @Input() patientId: string;

  errorMessage: any;
  data: PaginatedDataSource<Payment>;

  paymentsByPatientId$: Observable<Payment[]>;
  paymentSelectedSubject = new Subject<string>();
  paymentSelectedAction$ = this.paymentSelectedSubject.asObservable();
  paymentSelected$: Observable<PaymentSelected>;

  displayedColumns: string[] = ['expirationDate', 'value', 'status', 'statusColor'];

  constructor(private paymentService: PaymentService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.patientId) {
      this.data = new PaginatedDataSource<Payment>(
        request => this.paymentService.getByPatientIdPaginated(changes.patientId.currentValue, request),
        {property: 'expirationDate', order: 'desc'},
        5
      );

      this.paymentsByPatientId$ = this.paymentService
        .getByPatientId(changes.patientId.currentValue, 0, 5);

      this.paymentSelected$ =
        combineLatest([
          this.paymentsByPatientId$,
          this.paymentSelectedAction$])
          .pipe(
            map(([payments, paymentId]) => {
              const payment = payments.find(paymentItem => paymentItem.patientId === paymentId);
              const day = payment.expirationDate.getDate();
              const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ];
              return {
                statusDescription: this.paymentStatus(payment).description,
                referenceMonth: monthNames[payment.expirationDate.getMonth()],
                referenceDay:
                  day === 1 ? '1st' :
                  day === 2 ? '2nd' :
                  day.toString()
              } as PaymentSelected;
             })
          );
    }
  }

  paymentStatus(payment: Payment): any {
    return (!payment.paymentDate)
      ? (payment.expirationDate.getTime() < Date.now())
        ?  { description: 'Not Payed', styleClass: 'not-payed' }
        :  { description: '', styleClass: 'available' }
      :  (payment.paymentDate.getTime() > payment.expirationDate.getTime())
        ? { description: 'Delayed', styleClass: 'delayed' }
        : { description: 'Payed', styleClass: 'payed' };
  }

  selectPayment(payment: Payment): void {
    this.paymentSelectedSubject.next(payment.patientId);
  }
}
