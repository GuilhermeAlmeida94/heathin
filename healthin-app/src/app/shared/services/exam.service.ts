import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Exam } from '../interfaces/exam';

const exams: Exam[] =
  [{id: '1', name: 'Tomography', patient_id: '1', patient_name: 'Will', ask_data: '2020-12-01', ask_doctor_id: '11',
  ask_doctor_name: 'Rudolph', liberation_date: '2020-12-16', liberation_employee_id: '12', liberation_employee_name: 'Albert',
  do_data: '2021-01-01', do_doctor_id: '13', do_doctor_name: 'Marisa', contribution: 2000} as Exam,
  {id: '2', name: 'Laryngoscopy', patient_id: '2', patient_name: 'Wanessa', ask_data: '2020-12-01', ask_doctor_id: '11',
  ask_doctor_name: 'Rudolph', liberation_date: '2020-12-16', liberation_employee_id: '12', liberation_employee_name: 'Albert',
  do_data: '2021-01-05', do_doctor_id: '14', do_doctor_name: 'Clare', contribution: 25000}  as Exam,
  {id: '3', name: 'Laryngoscopy', patient_id: '1', patient_name: 'Will', ask_data: '2020-12-01', ask_doctor_id: '11',
  ask_doctor_name: 'Rudolph', liberation_date: '2020-12-16', liberation_employee_id: '12', liberation_employee_name: 'Albert',
  do_data: '2021-01-05', do_doctor_id: '14', do_doctor_name: 'Clare'} as Exam];

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor() { }

  getByPatientId(patientId: string): Observable<Exam[]> {
    return of(exams.filter(x => x.patient_id === patientId))
      .pipe(
        map(exams => exams.map(exam => {
          return {
            ...exam,
            contribution: exam.contribution ? exam.contribution / 100 : 0
          } as Exam;
        })),
        delay(2000)
      );
  }
}
