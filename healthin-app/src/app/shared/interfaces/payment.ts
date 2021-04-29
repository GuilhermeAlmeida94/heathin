export interface Payment {
    patientId: string;
    value: number;
    expirationDate: Date;
    paymentDate: Date;
}
