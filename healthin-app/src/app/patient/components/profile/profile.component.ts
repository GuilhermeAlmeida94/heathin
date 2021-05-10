import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Patient } from 'src/app/shared/interfaces/patient';
import { Phone } from 'src/app/shared/interfaces/phone';
import { State } from 'src/app/shared/interfaces/state';
import { MyValidators } from 'src/app/shared/my-validators';
import { ExamTypeService } from 'src/app/shared/services/exam-type.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { examTypesSet } from 'src/app/shared/state/exam-types.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {
  @Input() patientId: string;

  formGroup: FormGroup;
  errorMessage: any;
  patient: Patient;
  documentTypes = [
    { value: 'cnpj', text: 'CNPJ' },
    { value: 'cpf', text: 'CPF' }
  ];

  examTypes$ = this.examTypeService.getAll()
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  constructor(
    private store: Store<State>,
    private patientService: PatientService,
    private examTypeService: ExamTypeService,
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

    this.examTypes$
      .subscribe(examTypes => this.store.dispatch(examTypesSet({ examTypes })) );
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

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.patientId) {
      this.patient = null;
      this.getPatient();
    }
  }

  getPatient(): void {
    this.patientService.getByPatientId(this.patientId)
      .subscribe(patient => {
        return this.setFormGroupValue(patient);
      });
  }

  setFormGroupValue(patient: Patient): void {
    if (this.formGroup) {
      this.formGroup.patchValue({
        name: patient.name,
        documentType: patient.documentType,
        document: patient.document,
        notification: patient.notification,
        email: patient.email
      });

      this.formGroup.setControl('phones',
        this.buildPhones(patient.phones || []));

      this.patient = patient;
    }
  }

  changeToEditMode(): void {
    this.formGroup.enable();
  }

  save(): void {
    this.formGroup.disable();
  }

}
