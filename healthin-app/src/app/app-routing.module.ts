import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule)
  },
  {
      path: '**',
      redirectTo: 'patient',
      pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
