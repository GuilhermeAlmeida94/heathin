import { createReducer, on } from '@ngrx/store';
import { ExamType } from '../interfaces/exam-type';
import { examTypesSet } from './exam-types.action';

export class ShareState {
  examTypes: ExamType[];
}

export const initialState: ShareState =
{ examTypes: [] };

export const ShareReducer = createReducer(
  initialState,
  on(examTypesSet, (state, { examTypes }) => {
    return ({
      ...state,
      examTypes
    });
  })
);
