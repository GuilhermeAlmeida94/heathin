import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { delay } from 'rxjs/operators';
import { ExamRealizedData } from '../fake-data/exam-realized.data';
import { ExamRealized } from '../interfaces/exam-realized';

@Injectable({
  providedIn: 'root'
})
export class ExamRealizedService {

  constructor() { }

  getByPatientId(patientId: string): Observable<ExamRealized[]> {
    return of(ExamRealizedData.filter(x => x.patient_id === patientId))
    .pipe(
      delay(4000)
    );
  }

}
