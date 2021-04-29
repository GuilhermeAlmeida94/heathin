import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { catchError, map } from 'rxjs/operators';
import { ExamRealized } from 'src/app/shared/interfaces/exam-realized';
import { ExamRealizedService } from 'src/app/shared/services/exam-realized.service';
import { ExamTypeService } from 'src/app/shared/services/exam-type.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnChanges {
  @Input() patientId: string;

  errorMessage: any;

  examsRealizedByPatientId$: Observable<ExamRealized[]>;
  examsType$ = this.examTypeService.getAll()
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  private examTypeSubject = new BehaviorSubject<string>('');
  examTypeAction$ = this.examTypeSubject.asObservable();

  examsRealized$: Observable<ExamRealized[]>;

  constructor(private examRealizedService: ExamRealizedService,
              private examTypeService: ExamTypeService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.patientId) {
      this.examsRealizedByPatientId$ = this.examRealizedService.getByPatientId(this.patientId)
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      );

      this.examsRealized$ =
        combineLatest([this.examsRealizedByPatientId$, this.examsType$, this.examTypeAction$])
        .pipe(
          map(([examsRealized, examsType, examTypeId]) => {
            examsRealized = examsRealized
              .filter(examRealized => !examTypeId || examRealized.examId === examTypeId);

            return examsRealized.map(examRealized =>
              ({
                ...examRealized,
                examName: examsType.find(exam => exam.id === examRealized.examId).name,
                contribution: examRealized.contribution ? examRealized.contribution / 100 : 0
              }) as ExamRealized
            );
          })
        );
    }
  }

  examTypeChanges(event: any): void {
    this.examTypeSubject.next(event.value);
  }
}
