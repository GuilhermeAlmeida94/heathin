import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamType } from '../interfaces/exam-type';

@Injectable({
  providedIn: 'root'
})
export class ExamTypeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ExamType[]> {
    return this.http.get<ExamType[]>('api/examTypes');
  }

  getByExamId(examId: string): Observable<ExamType> {
    return this.http.get<ExamType>(`api/examTypes?id=${examId}`);
  }
}
