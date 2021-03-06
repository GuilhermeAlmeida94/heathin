import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PatientRoutingModule } from './patient-routing.module';

import { PatientComponent } from './components/patient/patient.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExamsComponent } from './components/exams/exams.component';
import { PaymentsComponent } from './components/payments/payments.component';

@NgModule({
  imports: [
    SharedModule,
    PatientRoutingModule,
  ],
  declarations: [
    PatientComponent,
    ProfileComponent,
    ExamsComponent,
    PaymentsComponent
  ]
})
export class PatientModule { }
