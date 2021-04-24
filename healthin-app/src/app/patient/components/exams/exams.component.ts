import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/shared/interfaces/exam';
import { ExamRealized } from 'src/app/shared/interfaces/exam-realized';
import { ExamRealizedService } from 'src/app/shared/services/exam-realized.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnChanges {
  @Input() patientId: string;

  examsRealized$: Observable<ExamRealized[]>;

  constructor(private examRealizedService: ExamRealizedService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.patientId) {
      this.examsRealized$ = this.examRealizedService.getByPatientId(this.patientId);
    }
  }
}
