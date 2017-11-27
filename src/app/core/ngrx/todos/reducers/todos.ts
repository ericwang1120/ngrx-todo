import { createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from '../models/todo';
import * as todo from '../actions/todo';

export interface State extends EntityState<Todo> {
    loading: boolean;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
    selectId: (obj: Todo) => obj.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    loading: false,
});

export function reducer(
    state = initialState,
    action: todo.Actions
): State {
    switch (action.type) {
        case todo.LOAD: {
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

        case todo.LOAD_FAIL: {
            return {
                ...adapter.removeAll(state),
                loading: false,
            };
        }

        default: {
            return state;
        }
    }
}

export const getLoading = (state: State) => state.loading;
