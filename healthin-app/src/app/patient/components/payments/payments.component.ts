import { Input, Component, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedData } from 'src/app/shared/interfaces/pagination/paginated-data';
import { Payment } from 'src/app/shared/interfaces/payment';
import { PaginatedDataSource } from 'src/app/shared/paginated-data-source';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnChanges {
  @Input() patientId: string;

  errorMessage: any;
  data: PaginatedDataSource<Payment>;

  paymentsByPatientIdPaginated$: Observable<PaginatedData<Payment>>;
  displayedColumns: string[] = ['expirationDate', 'value', 'status', 'statusColor'];

  constructor(private paymentService: PaymentService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.patientId) {
      this.data = new PaginatedDataSource<Payment>(
        request => this.paymentService.getByPatientIdPaginated(changes.patientId.currentValue, request),
        {property: 'expirationDate', order: 'desc'},
        5
      );
    }
  }

  paymentStatus(payment: Payment): any {
    if (!payment.paymentDate) {
        if (payment.expirationDate.getTime() < Date.now()) {
            return { description: 'Not Payed', styleClass: 'not-payed' };
        }
        else {
            return { description: '', styleClass: 'available' };
        }
    }
    else if (payment.paymentDate.getTime() > payment.expirationDate.getTime()){
        return { description: 'Delayed', styleClass: 'delayed' };
    }
    else {
        return { description: 'Payed', styleClass: 'payed' };
    }
  }
}
