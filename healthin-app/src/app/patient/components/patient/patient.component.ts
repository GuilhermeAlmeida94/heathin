import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
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
  form: FormGroup;
  patientOptions$: Observable<Patient[]>;
  patients: Patient[];

  constructor(private patientService: PatientService) {
    this.user = 'User';
    this.form = new FormGroup({
      patientName: new FormControl()
    });

    this.patientService.getAll().subscribe(
      res => {
        this.patients = res;
      }
    );
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
    this.patientOptions$ = this.form.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(typeof(value.patientName) === 'string' && value !== '' ? value.patientName : ''))
    );
  }

  private _filter(value: string): Patient[] {
    let patients: Patient[] = null;
    this.patientService.getByName(value).subscribe(res => {
      patients = res;
    });
    return patients;
  }

  getOptionName(patient: Patient): string {
      return patient ? patient.name : '';
  }

  optionSelected(patient: Patient): void {
    this.patientId = patient.id;
  }
}
