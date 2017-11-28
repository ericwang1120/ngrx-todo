import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { of } from 'rxjs/observable/of';
import { TodoService } from '../services/todo';

import * as todo from '../actions/todo';

export const LOAD_DEBOUNCE = new InjectionToken<number>('Load Debounce');
export const LOAD_SCHEDULER = new InjectionToken<Scheduler>(
    'Load Scheduler'
);

@Injectable()
export class TodoEffects {
    @Effect()
    public load$: Observable<Action> = this.actions$
        .ofType<todo.Load>(todo.LOAD)
        .debounceTime(this.debounce || 300, this.scheduler || async)
        .switchMap(() => {
            return this.todoService
                .load()
                .map((result) => new todo.LoadSuccess(result))
                .catch((err) => of(new todo.LoadFail(err)));
        });

    @Effect()
    public addOne$: Observable<Action> = this.actions$
        .ofType<todo.AddOne>(todo.ADD_ONE)
        .map((action) => action.payload)
        .mergeMap((payload) => {
            return this.todoService
                .addOne(payload)
                .map((result) => new todo.AddOneSuccess(result))
                .catch((err) => of(new todo.AddOneFail(err)));
        });

    @Effect()
    public removeOne$: Observable<Action> = this.actions$
        .ofType<todo.RemoveOne>(todo.REMOVE_ONE)
        .map((action) => action.payload)
        .mergeMap((payload) => {
            return this.todoService
                .removeOne(payload)
                .map((result) => new todo.RemoveOneSuccess(result))
                .catch((err) => of(new todo.RemoveOneFail(err)));
        });

    @Effect()
    public removeMany$: Observable<Action> = this.actions$
        .ofType<todo.RemoveMany>(todo.REMOVE_MANY)
        .map((action) => action.payload)
        .mergeMap((payload) => {
            return this.todoService
                .removeMany(payload)
                .map((result) => new todo.RemoveManySuccess(result))
                .catch((err) => of(new todo.RemoveManyFail(err)));
        });

    @Effect()
    public editOne$: Observable<Action> = this.actions$
        .ofType<todo.EditOne>(todo.EDIT_ONE)
        .mergeMap((action) => {
            return this.todoService
                .editOne(action.id, action.changes)
                .map((result) => new todo.EditOneSuccess(result))
                .catch((err) => of(new todo.EditOneFail(err)));
        });

    constructor(
        private actions$: Actions,
        private todoService: TodoService,
        @Optional()
        @Inject(LOAD_DEBOUNCE)
        private debounce,
        @Optional()
        @Inject(LOAD_SCHEDULER)
        private scheduler: Scheduler
    ) {
    }
}
