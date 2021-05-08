import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ExamRealizedData } from './exam-realized.data';
import { ExamTypeData } from './exam-type.data';
import { PatientData } from './patient.data';
import { PaymentData } from './payment.data';

export class InMemoryData implements InMemoryDbService {
    createDb(): any {
        const payments = PaymentData;
        const patients = PatientData;
        const examTypes = ExamTypeData;
        const examsRealized = ExamRealizedData;

        return { payments, patients, examTypes, examsRealized };
    }
}
