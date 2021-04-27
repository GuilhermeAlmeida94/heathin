import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { delay, map } from 'rxjs/operators';
import { ExamRealized } from '../interfaces/exam-realized';

const examsRealizedData: ExamRealized[] =
  [
    { id: '1', exam_id: '1', patient_id: '1', ask_data: '2020-12-01', ask_doctor_id: '11',
      ask_doctor_name: 'Rudolph', liberation_date: '2020-12-16', liberation_employee_id: '12', liberation_employee_name: 'Albert',
      do_data: '2021-01-01', do_doctor_id: '13', do_doctor_name: 'Marisa', contribution: 2000
    } as ExamRealized,
    { id: '2', exam_id: '2', patient_id: '2', ask_data: '2020-12-01', ask_doctor_id: '11',
      ask_doctor_name: 'Rudolph', liberation_date: '2020-12-16', liberation_employee_id: '12', liberation_employee_name: 'Albert',
      do_data: '2021-01-05', do_doctor_id: '14', do_doctor_name: 'Clare', contribution: 25000
    }  as ExamRealized,
    { id: '3', exam_id: '2', patient_id: '1', ask_data: '2020-12-01', ask_doctor_id: '11',
      ask_doctor_name: 'Rudolph', liberation_date: '2020-12-16', liberation_employee_id: '12',
      liberation_employee_name: 'Albert', do_data: '2021-01-05', do_doctor_id: '14',
      do_doctor_name: 'Clare'
    } as ExamRealized
  ];

@Injectable({
  providedIn: 'root'
})
export class ExamRealizedService {

  constructor() { }

  getByPatientId(patientId: string): Observable<ExamRealized[]> {
    return of(examsRealizedData.filter(x => x.patient_id === patientId))
    .pipe(
      delay(4000)
    );
  }

}
