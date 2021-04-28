import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ExamTypeData } from '../fake-data/exam-type.data';
import { Exam } from '../interfaces/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamTypeService {

  constructor() { }

  getAll(): Observable<Exam[]> {
    return of(ExamTypeData);
  }

  getByExamId(examId: string): Observable<Exam> {
    return of(ExamTypeData.find(x => x.id === examId))
      .pipe(
        delay(2000)
      );
  }
}
