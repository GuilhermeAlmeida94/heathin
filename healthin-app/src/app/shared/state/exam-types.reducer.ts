import { createReducer, on } from '@ngrx/store';
import { ExamType } from '../interfaces/exam-type';
import { examTypesSet } from './exam-types.action';

export interface ShareState {
  examTypes: ExamType[];
}

export const initialState: ShareState =
{
  examTypes: []
};

export const ShareReducer = createReducer<ShareState>(
  initialState,
  on(examTypesSet, (state, { examTypes }): ShareState => {
    return ({
      ...state,
      examTypes
    });
  })
);
