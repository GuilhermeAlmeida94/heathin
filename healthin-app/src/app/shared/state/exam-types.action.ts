import { createAction, props } from '@ngrx/store';
import { ExamType } from '../interfaces/exam-type';

export const examTypesSet = createAction('[Exam Types] Set', props<{ examTypes: ExamType[] }>());
