import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Patient } from 'src/app/shared/interfaces/patient';
import { Phone } from 'src/app/shared/interfaces/phone';
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
      document: { value: '', disabled: true },
      phones: { value: '', disabled: true }
    });
    this.getPatient();
  }

  get phones(): FormArray {
    return this.formGroup.get('phones') as FormArray;
  }

  addPhone(): void {
    this.phones.push(this.buildPhone());
  }
  removePhoneAt(i: number): void {
    this.phones.removeAt(i);
  }

  private buildPhone(phone?: Phone): FormGroup {
    const disabled = this.formGroup ? this.formGroup.disabled : true;
    return this.formBuilder.group({
      type: { value: phone ? phone.type : '', disabled },
      number: { value: phone ? phone.number : '', disabled }
    });
  }

  private buildPhones(phones: Phone[]): FormArray {
    const phonesFormArray = this.formBuilder.array([]);
    phonesFormArray.disable();
    for (const phone of phones) {
      phonesFormArray.push(this.buildPhone(phone));
    }

    return phonesFormArray;
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

      this.formGroup.setControl('phones', this.buildPhones(this.patient.phones || []));
      // if(this.patient.phones) {
      //   this.phones.controls[0].patchValue({
      //     type: this.patient.phones[0].type,
      //     number: this.patient.phones[0].number
      //   });
      // }
    }
  }

  changeToEditMode(): void {
    this.formGroup.enable();
  }

  changeToShowMode(): void {
    this.formGroup.disable();
  }

}
