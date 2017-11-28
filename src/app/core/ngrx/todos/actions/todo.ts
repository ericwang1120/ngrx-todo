import { Action } from '@ngrx/store';
import { Todo } from '../models/todo';
// tslint:disable:max-classes-per-file

export const LOAD = '[Todo] Load';
export const LOAD_SUCCESS = '[Todo] Load Success';
export const LOAD_FAIL = '[Todo] Load Fail';
export const ADD_ONE = '[Todo] Add One';
export const ADD_ONE_SUCCESS = '[Todo] Add One Success';
export const ADD_ONE_FAIL = '[Todo] Add One Fail';
export const EDIT_ONE = '[Todo] Edit One';
export const EDIT_ONE_SUCCESS = '[Todo] Edit One Success';
export const EDIT_ONE_FAIL = '[Todo] Edit One Fail';
export const REMOVE_ONE = '[Todo] Remove One';
export const REMOVE_ONE_SUCCESS = '[Todo] Remove One Success';
export const REMOVE_ONE_FAIL = '[Todo] Remove One Fail';
export const REMOVE_MANY = '[Todo] Remove Many';
export const REMOVE_MANY_SUCCESS = '[Todo] Remove Many Success';
export const REMOVE_MANY_FAIL = '[Todo] Remove Many Fail';
export const SELECT_TODO = '[Todo] Select Todo';

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

export class AddOne implements Action {
    public readonly type = ADD_ONE;

    constructor(public payload: Todo) { }
}

export class AddOneSuccess implements Action {
    public readonly type = ADD_ONE_SUCCESS;

    constructor(public payload: Todo) { }
}

export class AddOneFail implements Action {
    public readonly type = ADD_ONE_FAIL;

    constructor(public payload: any) { }
}

export class EditOne implements Action {
    public readonly type = EDIT_ONE;

    constructor(
        public id: number,
        public changes: Partial<Todo>
    ) { }
}

export class EditOneSuccess implements Action {
    public readonly type = EDIT_ONE_SUCCESS;

    constructor(public payload: { id: number, changes: Partial<Todo> }) { }
}

export class EditOneFail implements Action {
    public readonly type = EDIT_ONE_FAIL;

    constructor(public payload: any) { }
}

export class RemoveOne implements Action {
    public readonly type = REMOVE_ONE;

    constructor(public payload: number) { }
}

export class RemoveOneSuccess implements Action {
    public readonly type = REMOVE_ONE_SUCCESS;

    constructor(public payload: number) { }
}

export class RemoveOneFail implements Action {
    public readonly type = REMOVE_ONE_FAIL;

    constructor(public payload: any) { }
}

export class RemoveMany implements Action {
    public readonly type = REMOVE_MANY;

    constructor(public payload: number[]) { }
}

export class RemoveManySuccess implements Action {
    public readonly type = REMOVE_MANY_SUCCESS;

    constructor(public payload: number[]) { }
}

export class RemoveManyFail implements Action {
    public readonly type = REMOVE_MANY_FAIL;

    constructor(public payload: any) { }
}

export class SelectTodo implements Action {
    public readonly type = SELECT_TODO;

    constructor(public payload: number) { }
}

export type Actions = Load
    | LoadSuccess
    | LoadFail
    | AddOne
    | AddOneSuccess
    | AddOneFail
    | EditOne
    | EditOneSuccess
    | EditOneFail
    | RemoveOne
    | RemoveOneSuccess
    | RemoveOneFail
    | RemoveMany
    | RemoveManySuccess
    | RemoveManyFail
    | SelectTodo;
