import { reducer } from './todos';
import * as fromTodos from './todos';
import {
    Load,
    LoadFail,
    LoadSuccess,
    AddOneSuccess,
    AddOne,
    AddOneFail,
    EditOne,
    EditOneSuccess,
    EditOneFail,
    RemoveOneSuccess,
    RemoveOne,
    RemoveOneFail,
    RemoveMany
} from '../actions/todo';
import { Todo, generateMockTodo } from '../models/todo';
import { RemoveManySuccess, RemoveManyFail, SelectTodo } from '../actions/todo';

describe('TodosReducer', () => {
    const todo1 = generateMockTodo();
    const todo2 = { ...todo1, id: 222 };
    const todo3 = { ...todo1, id: 333 };
    const initialState: fromTodos.State = {
        ids: [],
        entities: {},
        loading: false,
        selectedId: 0
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
            loading: false,
            selectedId: 0
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
            loading: false,
            selectedId: 0
        };

        it('return empty array of todos when load fail', () => {
            const action = new LoadFail('Error Message');

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('selectors', () => {
        const expectedResult = initialState;

        it('should return correct loading selector', () => {
            const loading = expectedResult.loading;

            expect(fromTodos.getLoading(expectedResult)).toEqual(loading);
        });

        it('should return correct selected id selector', () => {
            const selectedId = expectedResult.selectedId;

            expect(fromTodos.getSelectedId(expectedResult)).toEqual(selectedId);
        });
    });

    describe('ADD_ONE', () => {
        const expectedResult = {
            ...initialState,
            loading: true,
        };

        it('should change loading to true when adding one', () => {
            const action = new AddOne(todo2);

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('ADD_ONE_SUCCESS', () => {
        const expectedResult = {
            ids: [222],
            entities: { [todo2.id]: todo2 },
            loading: false,
            selectedId: 0
        };

        it('should add a todo', () => {
            const action = new AddOneSuccess(todo2);

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('ADD_ONE_FAIL', () => {
        const expectedResult = {
            ids: [],
            entities: {},
            loading: false,
            selectedId: 0
        };

        it('return previous list of todos when load fail', () => {
            const action = new AddOneFail('Error Message');

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('EDIT_ONE', () => {
        const currentState = {
            ids: [todo2.id, todo3.id],
            entities: {
                [todo2.id]: todo2,
                [todo3.id]: todo3
            },
            loading: false,
            selectedId: 0
        };

        const changes = { title: 'editedTitle' };
        const idToEdit = 222;

        const editedObj = {
            ...todo2,
            title: 'editedTitle'
        };

        it('should change loading to true when editing one', () => {
            const expectedResult = {
                ids: [todo2.id, todo3.id],
                entities: {
                    [todo2.id]: todo2,
                    [todo3.id]: todo3
                },
                loading: true,
                selectedId: 0
            };

            const action = new EditOne(idToEdit, changes);

            const result = reducer(currentState, action);

            expect(result).toEqual(expectedResult);
        });
    });


    describe('EDIT_ONE_SUCCESS', () => {
        const currentState = {
            ids: [todo2.id, todo3.id],
            entities: {
                [todo2.id]: todo2,
                [todo3.id]: todo3
            },
            loading: true,
            selectedId: 0
        };

        const changes = { title: 'editedTitle' };
        const idToEdit = 222;

        const editedObj = {
            ...todo2,
            title: 'editedTitle'
        };

        const expectedResult = {
            ids: [todo2.id, todo3.id],
            entities: {
                [todo2.id]: editedObj,
                [todo3.id]: todo3
            },
            loading: false,
            selectedId: 0
        };

        it('should update state when edit success', () => {

            const action = new EditOneSuccess({ id: idToEdit, changes });

            const result = reducer(currentState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('EDIT_ONE_FAIL', () => {
        const currentState = {
            ids: [todo2.id, todo3.id],
            entities: {
                [todo2.id]: todo2,
                [todo3.id]: todo3
            },
            loading: true,
            selectedId: 0
        };

        const expectedResult = {
            ids: [todo2.id, todo3.id],
            entities: {
                [todo2.id]: todo2,
                [todo3.id]: todo3
            },
            loading: false,
            selectedId: 0
        };

        it('return previous list of todos when edit fail', () => {
            const action = new EditOneFail('Error Message');

            const result = reducer(currentState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('REMOVE_ONE', () => {
        const currentState = {
            ids: [todo2.id, todo3.id],
            entities: {
                [todo2.id]: todo2,
                [todo3.id]: todo3
            },
            loading: false,
            selectedId: 0
        };

        const idToRemove = 222;

        it('should change loading to true when removing one', () => {
            const expectedResult = {
                ids: [todo2.id, todo3.id],
                entities: {
                    [todo2.id]: todo2,
                    [todo3.id]: todo3
                },
                loading: true,
                selectedId: 0
            };

            const action = new RemoveOne(idToRemove);

            const result = reducer(currentState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('REMOVE_ONE_SUCCESS', () => {
        const currentState = {
            ids: [todo2.id, todo3.id],
            entities: {
                [todo2.id]: todo2,
                [todo3.id]: todo3
            },
            loading: true,
            selectedId: 0
        };

        const idToRemove = 222;

        const expectedResult = {
            ids: [todo3.id],
            entities: {
                [todo3.id]: todo3
            },
            loading: false,
            selectedId: 0
        };

        it('should update state when remove one success', () => {

            const action = new RemoveOneSuccess(idToRemove);

            const result = reducer(currentState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('REMOVE_ONE_FAIL', () => {
        const currentState = {
            ids: [todo2.id, todo3.id],
            entities: {
                [todo2.id]: todo2,
                [todo3.id]: todo3
            },
            loading: true,
            selectedId: 0
        };

        const expectedResult = {
            ids: [todo2.id, todo3.id],
            entities: {
                [todo2.id]: todo2,
                [todo3.id]: todo3
            },
            loading: false,
            selectedId: 0
        };

        it('return previous list of todos when remove fail', () => {
            const action = new RemoveOneFail('Error Message');

            const result = reducer(currentState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('REMOVE_MANY', () => {
        const currentState = {
            ids: [todo2.id, todo3.id],
            entities: {
                [todo2.id]: todo2,
                [todo3.id]: todo3
            },
            loading: false,
            selectedId: 0
        };

        const idsToRemove = [222, 333];

        it('should change loading to true when removing many', () => {
            const expectedResult = {
                ids: [todo2.id, todo3.id],
                entities: {
                    [todo2.id]: todo2,
                    [todo3.id]: todo3
                },
                loading: true,
                selectedId: 0
            };

            const action = new RemoveMany(idsToRemove);

            const result = reducer(currentState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('REMOVE_MANY_SUCCESS', () => {
        const currentState = {
            ids: [todo2.id, todo3.id],
            entities: {
                [todo2.id]: todo2,
                [todo3.id]: todo3
            },
            loading: true,
            selectedId: 0
        };

        const idsToRemove = [222, 333];

        const expectedResult = {
            ids: [],
            entities: {
            },
            loading: false,
            selectedId: 0
        };

        it('should update state when remove many success', () => {

            const action = new RemoveManySuccess(idsToRemove);

            const result = reducer(currentState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('REMOVE_MANY_FAIL', () => {
        const currentState = {
            ids: [todo2.id, todo3.id],
            entities: {
                [todo2.id]: todo2,
                [todo3.id]: todo3
            },
            loading: true,
            selectedId: 0
        };

        const idsToRemove = [222, 333];

        const expectedResult = {
            ids: [todo2.id, todo3.id],
            entities: {
                [todo2.id]: todo2,
                [todo3.id]: todo3
            },
            loading: false,
            selectedId: 0
        };

        it('return previous list of todos when remove many fail', () => {
            const action = new RemoveManyFail('Error Message');

            const result = reducer(currentState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('SELECT_TODO', () => {
        const currentState = {
            ids: [todo2.id, todo3.id],
            entities: {
                [todo2.id]: todo2,
                [todo3.id]: todo3
            },
            loading: true,
            selectedId: 0
        };

        const idsToSelect = 222;

        const expectedResult = {
            ...currentState,
            selectedId: 222
        };

        it('should select the todo', () => {
            const action = new SelectTodo(idsToSelect);

            const result = reducer(currentState, action);

            expect(result).toEqual(expectedResult);
        });
    });
});
