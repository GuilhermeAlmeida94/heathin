import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/shared/interfaces/patient';
import { Phone } from 'src/app/shared/interfaces/phone';
import { MyValidators } from 'src/app/shared/my-validators';
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
  documentTypes = [
    { value: 'cnpj', text: 'CNPJ' },
    { value: 'cpf', text: 'CPF' }
  ];

  constructor(
    private patientService: PatientService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [{ value: '', disabled: true }, Validators.required],
      documentType: [{ value: '', disabled: true }, Validators.required],
      document: [{ value: '', disabled: true}, [MyValidators.noWhitespace]],
      notification: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.email],
      phones: { value: '', disabled: true }
    });

    this.formGroup.get('notification').valueChanges.subscribe(
      value => this.setEmailPhoneValidator(value)
    );
    this.formGroup.get('documentType').valueChanges.subscribe(
      value => this.setDocumentTypeValidator(value)
    );
    this.getPatient();
  }

  setEmailPhoneValidator(notificationType: string): void {
    const email = this.formGroup.get('email');
    const phones = this.formGroup.get('phones');
    if (notificationType === 'email') {
      email.setValidators([Validators.required, Validators.email]);
      phones.clearValidators();
    }
    else {
      email.setValidators(Validators.email);
      phones.setValidators([Validators.required, Validators.minLength(1)]);
    }
    email.updateValueAndValidity();
    phones.updateValueAndValidity();
  }

  setDocumentTypeValidator(documentType: string): void {
    const documentForm = this.formGroup.get('document');
    documentForm.setValidators(
      [
        Validators.required,
        MyValidators.noWhitespace,
        MyValidators.documentType(documentType)
      ]);
    documentForm.updateValueAndValidity();
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
        documentType: this.patient.documentType,
        document: this.patient.document,
        notification: this.patient.notification,
        email: this.patient.email
      });


      this.formGroup.setControl('phones',
        this.buildPhones(this.patient.phones || []));
    }
  }

  changeToEditMode(): void {
    this.formGroup.enable();
  }

  save(): void {
    this.formGroup.disable();
  }

}
