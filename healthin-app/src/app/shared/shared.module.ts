import { NgModule } from '@angular/core';
import { DateTimeFormatPipe } from './pipe/date-time-format.pipe';
import { SharedModuleList } from './shared-module-list';

@NgModule({
  declarations: [
    DateTimeFormatPipe,
  ],
  imports: [...SharedModuleList],
  exports: [...SharedModuleList, DateTimeFormatPipe]
})
export class SharedModule { }
