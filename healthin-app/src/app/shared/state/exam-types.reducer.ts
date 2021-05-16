import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { ExamType } from '../interfaces/exam-type';
import { examTypesSet } from './exam-types.action';

export interface SharedState {
  examTypes: ExamType[];
}

export const initialState: SharedState =
{
  examTypes: []
};

const getSharedState = createFeatureSelector<SharedState>('shared');
export const getExamTypesState = createSelector(
  getSharedState,
  shared => shared.examTypes
);

export const ShareReducer = createReducer<SharedState>(
  initialState,
  on(examTypesSet, (state, { examTypes }): SharedState => {
    return ({
      ...state,
      examTypes
    });
  })
);
