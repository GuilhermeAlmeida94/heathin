import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamsComponent } from './components/exams/exams.component';
import { PatientComponent } from './components/patient/patient.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: PatientComponent,
    children: [
      { path: '', component: ProfileComponent },
      { path: 'exams/:patientId', component: ExamsComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
