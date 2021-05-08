import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ExamRealized } from '../interfaces/exam-realized';

@Injectable({
  providedIn: 'root'
})
export class ExamRealizedService {

  constructor(private http: HttpClient) { }

  getByPatientId(patientId: string): Observable<ExamRealized[]> {
    return this.http.get<ExamRealized[]>(`api/examsRealized?patientId=${patientId}`);
  }

}
