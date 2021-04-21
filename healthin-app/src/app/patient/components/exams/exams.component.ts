import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/shared/interfaces/exam';
import { ExamService } from 'src/app/shared/services/exam.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnChanges {
  @Input() patientId: string;

  exams$: Observable<Exam[]>;

  constructor(private examService: ExamService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.patientId) {
      this.exams$ = this.examService.getByPatientId(this.patientId);
    }
  }
}
