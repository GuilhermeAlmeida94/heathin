import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { Patient } from 'src/app/shared/interfaces/patient';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  user: string;
  patientId: string;
  navLinks: any[];
  formGroup: FormGroup;
  patients$: Observable<Patient[]>;
  patientSelected: Patient;

  constructor(private patientService: PatientService) {
    this.user = 'User';
    this.formGroup = new FormGroup({
      patientName: new FormControl()
    });

    this.navLinks = [
        {
            label: 'Profile',
            link: './profile',
            index: 0
        }, {
            label: 'Exams',
            link: `./exams/${this.patientId}`,
            index: 1
        },
    ];
  }

  ngOnInit(): void {
    this.patients$ = this.formGroup.get('patientName')
    .valueChanges.pipe(
      debounceTime(1000), // Waits 1 second to the last request, to make the request with the most recent value
      map(value =>  typeof(value) === 'string' && value ? value : ''),
      switchMap(name => this.patientService.getByName(name))
    );
  }

  getOptionName(patient: Patient): string {
      return patient ? patient.name : '';
  }

  optionSelected(patient: Patient): void {
    this.patientSelected = patient;
    this.patientId = patient.id;
  }
}
