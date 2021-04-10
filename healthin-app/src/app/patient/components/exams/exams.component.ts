import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Exam } from 'src/app/shared/interfaces/exam';
import { ExamsService } from 'src/app/shared/services/exams.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit, OnChanges {
  @Input() patientId: string;

  exams: Exam[] = null;

  constructor(private examService: ExamsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.exams = null;
    this.getExames();
  }

  ngOnInit(): void {
    this.getExames();
  }

  getExames(): void {
    if (!this.exams) {
      this.examService.getByPatientId(this.patientId).subscribe(
        res => {
          this.exams = res;
        }
      );
    }
  }

}
