import { Payment } from '../interfaces/payment';

export const PaymentData: Payment[] = [
    { patientId: '1', value: 50.0, expirationDate: new Date('2020-01-20'), paymentDate: new Date('2020-01-15') } as Payment,
    { patientId: '1', value: 50.0, expirationDate: new Date('2020-02-20'), paymentDate: new Date('2020-02-15') } as Payment,
    { patientId: '1', value: 50.0, expirationDate: new Date('2020-03-20'), paymentDate: new Date('2020-03-15') } as Payment,
    { patientId: '1', value: 50.0, expirationDate: new Date('2020-04-20'), paymentDate: new Date('2020-04-15') } as Payment,
    { patientId: '1', value: 50.0, expirationDate: new Date('2020-05-20'), paymentDate: new Date('2020-05-15') } as Payment,
    { patientId: '1', value: 50.0, expirationDate: new Date('2020-06-20'), paymentDate: new Date('2020-06-20') } as Payment,
    { patientId: '1', value: 50.0, expirationDate: new Date('2020-07-20'), paymentDate: new Date('2020-07-20') } as Payment,
    { patientId: '1', value: 65.5, expirationDate: new Date('2020-08-20'), paymentDate: new Date('2020-08-20') } as Payment,
    { patientId: '1', value: 65.5, expirationDate: new Date('2020-09-20'), paymentDate: new Date('2020-09-25') } as Payment,
    { patientId: '1', value: 65.5, expirationDate: new Date('2020-10-20'), paymentDate: new Date('2020-10-30') } as Payment,
    { patientId: '1', value: 65.5, expirationDate: new Date('2020-11-20') } as Payment,
    { patientId: '1', value: 65.5, expirationDate: new Date('2020-12-20') } as Payment,
    { patientId: '1', value: 65.5, expirationDate: new Date('2021-01-20') } as Payment,
    { patientId: '1', value: 65.5, expirationDate: new Date('2021-02-20') } as Payment,
    { patientId: '1', value: 65.5, expirationDate: new Date('2021-03-20') } as Payment,
    { patientId: '1', value: 65.5, expirationDate: new Date('2021-04-20') } as Payment,
    { patientId: '1', value: 65.5, expirationDate: new Date('2021-05-20') } as Payment,
    { patientId: '2', value: 55.5, expirationDate: new Date('2020-09-25'), paymentDate: new Date('2020-09-09') } as Payment,
    { patientId: '2', value: 55.5, expirationDate: new Date('2020-10-25'), paymentDate: new Date('2020-10-09') } as Payment,
    { patientId: '2', value: 55.5, expirationDate: new Date('2020-11-25'), paymentDate: new Date('2020-11-09') } as Payment,
    { patientId: '2', value: 55.5, expirationDate: new Date('2020-12-25'), paymentDate: new Date('2020-12-09') } as Payment,
];
