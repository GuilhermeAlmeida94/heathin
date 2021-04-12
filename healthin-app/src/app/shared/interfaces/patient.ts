import { Phone } from './phone';

export interface Patient {
    id: string;
    name: string;
    documentType: string;
    document: string;
    email: string;
    phones: Phone[];
}
