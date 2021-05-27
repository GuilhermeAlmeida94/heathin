import { createAction, props } from '@ngrx/store';
import { ExamType } from '../interfaces/exam-type';

export const loadExamTypes = createAction('[Exam Types] Load');
export const loadExamTypesSuccess = createAction('[Exam Types] Load Success', props<{ examTypes: ExamType[] }>());
export const loadExamTypesFailure = createAction('[Exam Types] Load Failure', props<{ examTypesError: string }>());
