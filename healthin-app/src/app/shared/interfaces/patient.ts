import { Phone } from './phone';

export interface Patient {
    id: string;
    name: string;
    document: string;
    phones: Phone[]
}
