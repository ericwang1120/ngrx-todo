import { reducer } from './todos';
import * as fromTodos from './todos';
import { Load, LoadFail, LoadSuccess } from '../actions/todo';
import { Todo, generateMockTodo } from '../models/todo';

describe('TodosReducer', () => {
    const todo1 = generateMockTodo();
    const todo2 = { ...todo1, id: '222' };
    const todo3 = { ...todo1, id: '333' };
    const initialState: fromTodos.State = {
        ids: [],
        entities: {},
        loading: false,
    };

    describe('undefined action', () => {
        it('should return the default state', () => {
            const result = reducer(undefined, {} as any);

            expect(result).toEqual(initialState);
        });
    });

    describe('LOAD', () => {
        const expectedResult = {
            ...initialState,
            loading: true,
        };

        it('should change loading to true', () => {
            const action = new Load();

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('LOAD_SUCCESS', () => {
        const expectedResult = {
            ids: [todo2.id, todo3.id],
            entities: {
                [todo2.id]: todo2,
                [todo3.id]: todo3
            },
            loading: false
        };

        it('should load todos', () => {
            const action = new LoadSuccess([todo2, todo3]);

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('LOAD_FAIL', () => {
        const expectedResult = {
            ids: [],
            entities: {},
            loading: false
        };

        it('return empty array of todos when load fail', () => {
            const action = new LoadFail('Error Message');

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('selectors', () => {
        const expectedResult = initialState;

        it('should return correct selector', () => {
            const loading = expectedResult.loading;

            expect(fromTodos.getLoading(expectedResult)).toEqual(loading);
        });
    });
});
