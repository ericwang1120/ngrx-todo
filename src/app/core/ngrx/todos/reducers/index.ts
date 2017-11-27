import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTodos from './todos';
import * as fromRoot from '../../reducer';

export interface TodosState {
    todos: fromTodos.State;
}

export interface State extends fromRoot.State {
    'todos': TodosState;
}

export const reducers = {
    todos: fromTodos.reducer,
};

export const getTodosState = createFeatureSelector<TodosState>('todos');

export const getTodoEntitiesState = createSelector(
    getTodosState,
    (state) => state.todos
);

export const {
    selectIds: getTodoIds,
    selectEntities: getTodoEntities,
    selectAll: getAllTodos,
    selectTotal: getTotalTodos,
  } = fromTodos.adapter.getSelectors(getTodoEntitiesState);

export const getLoading = createSelector(
    getTodoEntitiesState,
    fromTodos.getLoading
);
