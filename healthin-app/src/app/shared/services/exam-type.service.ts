import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '../interfaces/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamTypeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Exam[]> {
    return this.http.get<Exam[]>('api/examTypes');
  }

  getByExamId(examId: string): Observable<Exam> {
    return this.http.get<Exam>(`api/examTypes?id=${examId}`);
  }
}
