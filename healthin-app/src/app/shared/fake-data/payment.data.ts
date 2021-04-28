import { Payment } from '../interfaces/payment';

export const PaymentData: Payment[] = [
    { patient_id: '1', value: 50, expiration_date: '2020-01-20', payment_date: '2020-01-15' } as Payment,
    { patient_id: '1', value: 50, expiration_date: '2020-02-20', payment_date: '2020-02-15' } as Payment,
    { patient_id: '1', value: 50, expiration_date: '2020-03-20', payment_date: '2020-03-15' } as Payment,
    { patient_id: '1', value: 50, expiration_date: '2020-04-20', payment_date: '2020-04-15' } as Payment,
    { patient_id: '1', value: 50, expiration_date: '2020-05-20', payment_date: '2020-05-15' } as Payment,
    { patient_id: '1', value: 50, expiration_date: '2020-06-20', payment_date: '2020-06-20' } as Payment,
    { patient_id: '1', value: 50, expiration_date: '2020-07-20', payment_date: '2020-07-20' } as Payment,
    { patient_id: '1', value: 65.5, expiration_date: '2020-08-20', payment_date: '2020-08-20' } as Payment,
    { patient_id: '1', value: 65.5, expiration_date: '2020-09-20', payment_date: '2020-09-20' } as Payment,
    { patient_id: '1', value: 65.5, expiration_date: '2020-10-20', payment_date: '2020-10-20' } as Payment,
    { patient_id: '1', value: 65.5, expiration_date: '2020-11-20' } as Payment,
    { patient_id: '1', value: 65.5, expiration_date: '2020-12-20' } as Payment,
    { patient_id: '2', value: 55.5, expiration_date: '2020-09-25', payment_date: '2020-09-09' } as Payment,
    { patient_id: '2', value: 55.5, expiration_date: '2020-10-25', payment_date: '2020-10-09' } as Payment,
    { patient_id: '2', value: 55.5, expiration_date: '2020-11-25', payment_date: '2020-11-09' } as Payment,
    { patient_id: '2', value: 55.5, expiration_date: '2020-12-25', payment_date: '2020-12-09' } as Payment,
];
