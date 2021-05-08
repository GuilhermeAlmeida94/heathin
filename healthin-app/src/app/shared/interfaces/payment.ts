export interface Payment {
    paymentId: string;
    patientId: string;
    value: number;
    expirationDate: string;
    paymentDate: string;
}
