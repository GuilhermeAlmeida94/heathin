import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { catchError, map, startWith } from 'rxjs/operators';
import { ExamType } from 'src/app/shared/interfaces/exam-type';
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
  examTypes$ = this.examTypeService.getAll()
    .pipe(
      startWith([] as ExamType[]),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
  private examTypeSubject = new BehaviorSubject<string>('');
  examTypeAction$ = this.examTypeSubject.asObservable();

  examsRealized$: Observable<any>;

  constructor(private examRealizedService: ExamRealizedService,
              private examTypeService: ExamTypeService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.patientId) {
      this.examsRealizedByPatientId$ = this.examRealizedService.getByPatientId(this.patientId)
      .pipe(
        startWith([]),
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      );

      this.examsRealized$ =
        combineLatest([this.examsRealizedByPatientId$, this.examTypes$, this.examTypeAction$])
        .pipe(
          map(([examsRealized, examsType, examTypeId]) => {
            let isLoading = true;
            if (!!examsRealized && examsType.length > 0) {
              examsRealized = examsRealized
                .filter(examRealized => !examTypeId || examRealized.examId === examTypeId);

              examsRealized = examsRealized.map(examRealized =>
                ({
                  ...examRealized,
                  examName: examsType.find(exam => exam.id === examRealized.examId).name,
                  contribution: examRealized.contribution ? examRealized.contribution / 100 : 0
                }) as ExamRealized
              );
              isLoading = false;
            }

            return { value: examsRealized, isLoading };
          })
        );
    }
  }

  examTypeChanges(event: any): void {
    this.examTypeSubject.next(event.value);
  }
}
