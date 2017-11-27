import { Action } from '@ngrx/store';
import { Todo } from '../models/todo';
// tslint:disable:max-classes-per-file

export const LOAD = '[Todo] Load';
export const LOAD_SUCCESS = '[Todo] Load Success';
export const LOAD_FAIL = '[Todo] Load Fail';

export class Load implements Action {
    public readonly type = LOAD;
}

export class LoadSuccess implements Action {
    public readonly type = LOAD_SUCCESS;

    constructor(public payload: Todo[]) { }
}

export class LoadFail implements Action {
    public readonly type = LOAD_FAIL;

    constructor(public payload: any) { }
}

export type Actions = Load
    | LoadSuccess
    | LoadFail;
