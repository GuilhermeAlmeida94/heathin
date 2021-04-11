import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Patient } from 'src/app/shared/interfaces/patient';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {
  @Input() patientId: string;

  formGroup: FormGroup;
  patient: Patient;

  constructor(
    private patientService: PatientService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: { value: '', disabled: true },
      document: { value: '', disabled: true }
    });
    this.getPatient();
  }

  ngOnChanges(): void {
    this.patient = null;
    this.getPatient();
  }

  async getPatient(): Promise<void> {
    if (!this.patient) {
      await this.patientService.getByPatientId(this.patientId)
        .subscribe(
          value => this.patient = value
        );
      this.formGroup.patchValue({
        name: this.patient.name,
        document: this.patient.document
      });
    }
  }

  changeToEditMode(): void {
    this.formGroup.enable();
  }

  changeToShowMode(): void {
    this.formGroup.disable();
  }

}
