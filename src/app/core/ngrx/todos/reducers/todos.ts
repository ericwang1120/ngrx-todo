import { createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from '../models/todo';
import * as todo from '../actions/todo';

export interface State extends EntityState<Todo> {
    loading: boolean;
    selectedId: number;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
    selectId: (obj: Todo) => obj.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    loading: false,
    selectedId: 0
});

export function reducer(
    state = initialState,
    action: todo.Actions
): State {
    switch (action.type) {
        case todo.LOAD:
        case todo.ADD_ONE:
        case todo.REMOVE_ONE:
        case todo.REMOVE_MANY:
        case todo.EDIT_ONE: {
            return {
                ...state,
                loading: true,
            };
        }

        case todo.LOAD_SUCCESS: {
            return {
                ...adapter.addAll(action.payload, state),
                loading: false,
            };
        }

        case todo.ADD_ONE_SUCCESS: {
            return {
                ...adapter.addOne(action.payload, state),
                loading: false,
            };
        }

        case todo.REMOVE_ONE_SUCCESS: {
            return {
                ...adapter.removeOne(action.payload, state),
                loading: false,
            };
        }

        case todo.REMOVE_MANY_SUCCESS: {
            return {
                ...adapter.removeMany(action.payload, state),
                loading: false,
            };
        }

        case todo.EDIT_ONE_SUCCESS: {
            return {
                ...adapter.updateOne(action.payload, state),
                selectedId: 0,
                loading: false,
            };
        }

        case todo.LOAD_FAIL: {
            return {
                ...adapter.removeAll(state),
                loading: false,
            };
        }

        case todo.ADD_ONE_FAIL:
        case todo.REMOVE_ONE_FAIL:
        case todo.REMOVE_MANY_FAIL:
        case todo.EDIT_ONE_FAIL: {
            return {
                ...state,
                loading: false,
            };
        }

        case todo.SELECT_TODO: {
            return {
                ...state,
                selectedId: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getLoading = (state: State) => state.loading;

export const getSelectedId = (state: State) => state.selectedId;
