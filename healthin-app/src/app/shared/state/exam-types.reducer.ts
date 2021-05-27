import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { ExamType } from '../interfaces/exam-type';
import * as ExamTypesActions from './exam-types.actions';

export interface SharedState {
  examTypes: ExamType[];
  examTypesError: string;
}

export const initialState: SharedState =
{
  examTypes: [],
  examTypesError: ''
};

const getSharedState = createFeatureSelector<SharedState>('shared');
export const getExamTypesState = createSelector(
  getSharedState,
  shared => shared.examTypes
);
export const getExamTypesErrorState = createSelector(
  getSharedState,
  shared => shared.examTypesError
);

export const ShareReducer = createReducer<SharedState>(
  initialState,
  on(ExamTypesActions.loadExamTypes, (state): SharedState => {
    return (state);
  }),
  on(ExamTypesActions.loadExamTypesSuccess, (state, action): SharedState => {
    return ({
      ...state,
      examTypes: action.examTypes,
      examTypesError: ''
    });
  }),
  on(ExamTypesActions.loadExamTypesFailure, (state, action): SharedState => {
    return ({
      ...state,
      examTypes: [],
      examTypesError: action.examTypesError
    });
  })
);
