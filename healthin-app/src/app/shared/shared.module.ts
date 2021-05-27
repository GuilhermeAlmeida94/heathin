import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DateTimeFormatPipe } from './pipe/date-time-format.pipe';
import { SharedModuleList } from './shared-module-list';
import { ExamTypesEffects } from './state/exam-types.effects';
import { ShareReducer } from './state/exam-types.reducer';

@NgModule({
  declarations: [
    DateTimeFormatPipe,
  ],
  imports: [
    ...SharedModuleList,
    StoreModule.forFeature('shared', ShareReducer),
    EffectsModule.forFeature([ExamTypesEffects])
  ],
  exports: [...SharedModuleList, DateTimeFormatPipe]
})
export class SharedModule { }
