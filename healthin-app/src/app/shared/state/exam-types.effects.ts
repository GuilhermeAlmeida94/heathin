import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ExamTypeService } from '../services/exam-type.service';
import * as ExamTypesActions from './exam-types.actions';

@Injectable()
export class ExamTypesEffects {
    constructor(private actions$: Actions,
                private examTypesService: ExamTypeService) { }

    loadExamTypes$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ExamTypesActions.loadExamTypes),
            mergeMap(() => this.examTypesService.getAll().pipe(
                map(examTypes => ExamTypesActions.loadExamTypesSuccess({ examTypes })),
                catchError(examTypesError => of(ExamTypesActions.loadExamTypesFailure({ examTypesError: examTypesError.body.error })))
            ))
        );
    });
}
