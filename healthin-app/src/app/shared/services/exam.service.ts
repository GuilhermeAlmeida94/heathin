import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Exam } from '../interfaces/exam';

const exams: Exam[] =
  [
    { id: '1', name: 'Tomography', value: 200 } as Exam,
    { id: '2', name: 'Laryngoscopy', value: 500 }  as Exam
  ];

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor() { }

  getAll(): Observable<Exam[]> {
    return of(exams);
  }

  getByExamId(examId: string): Observable<Exam> {
    return of(exams.find(x => x.id === examId))
      .pipe(
        delay(2000)
      );
  }
}
