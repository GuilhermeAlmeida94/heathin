import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { DateTimeFormatPipe } from './pipe/date-time-format.pipe';
import { SharedModuleList } from './shared-module-list';
import { ShareReducer } from './state/exam-types.reducer';

@NgModule({
  declarations: [
    DateTimeFormatPipe,
  ],
  imports: [
    ...SharedModuleList,
    StoreModule.forFeature('shared', ShareReducer)
  ],
  exports: [...SharedModuleList, DateTimeFormatPipe]
})
export class SharedModule { }
