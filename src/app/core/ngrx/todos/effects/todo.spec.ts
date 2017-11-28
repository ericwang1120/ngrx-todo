import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { empty } from 'rxjs/observable/empty';
import { TodoEffects, LOAD_SCHEDULER, LOAD_DEBOUNCE } from './todo';
import { TodoService } from '../services/todo';
import { Observable } from 'rxjs/Observable';
import {
    Load, LoadSuccess, LoadFail, AddOne,
    AddOneSuccess, AddOneFail, RemoveOne,
    RemoveOneSuccess, RemoveOneFail, RemoveMany,
    RemoveManySuccess, RemoveManyFail
} from '../actions/todo';
import { Todo, generateMockTodo } from '../models/todo';
import { EditOne, EditOneSuccess, EditOneFail } from '../actions/todo';

export class TestActions extends Actions {
    constructor() {
        super(empty());
    }

    set stream(source: Observable<any>) {
        this.source = source;
    }
}

export function getActions() {
    return new TestActions();
}

describe('TodoEffects', () => {
    let effects: TodoEffects;
    let todoService: any;
    let actions$: TestActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TodoEffects,
                {
                    provide: TodoService,
                    useValue: jasmine.createSpyObj('todoService', ['load', 'addOne', 'removeOne', 'removeMany', 'editOne']),
                },
                { provide: Actions, useFactory: getActions },
                { provide: LOAD_SCHEDULER, useFactory: getTestScheduler },
                { provide: LOAD_DEBOUNCE, useValue: 30 },
            ],
        });

        effects = TestBed.get(TodoEffects);
        todoService = TestBed.get(TodoService);
        actions$ = TestBed.get(Actions);
    });

    describe('load$', () => {
        it('should load successful', () => {
            const todo1 = generateMockTodo();
            const todo2 = { ...todo1, id: 222 };
            const todos = [todo2, todo2];

            const action = new Load();
            const completion = new LoadSuccess(todos);

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-a|', { a: todos });
            const expected = cold('-----b', { b: completion });
            todoService.load = () => response;
            expect(effects.load$).toBeObservable(expected);
        });

        it('should load fail', () => {
            const action = new Load();
            const completion = new LoadFail('Unexpected Error. Try again later.');
            const error = 'Unexpected Error. Try again later.';

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-#|', {}, error);
            const expected = cold('-----b', { b: completion });
            todoService.load = () => response;

            expect(effects.load$).toBeObservable(expected);
        });
    });

    describe('addOne$', () => {
        const todo1 = generateMockTodo();
        const todo2 = { ...todo1, id: 222 };
        const action = new AddOne(todo2);

        it('should add one successful', () => {
            const completion = new AddOneSuccess(todo2);

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-a|', { a: todo2 });
            const expected = cold('--b', { b: completion });
            todoService.addOne = () => response;
            expect(effects.addOne$).toBeObservable(expected);
        });

        it('should add one fail', () => {
            const completion = new AddOneFail('Unexpected Error. Try again later.');
            const error = 'Unexpected Error. Try again later.';

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-#|', {}, error);
            const expected = cold('--b', { b: completion });
            todoService.addOne = () => response;

            expect(effects.addOne$).toBeObservable(expected);
        });
    });

    describe('removeOne$', () => {
        const todo1 = generateMockTodo();
        const todo2 = { ...todo1, id: 222 };
        const action = new RemoveOne(todo2.id);

        it('should remove one successful', () => {
            const completion = new RemoveOneSuccess(todo2.id);

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-a|', { a: todo2.id });
            const expected = cold('--b', { b: completion });
            todoService.removeOne = () => response;
            expect(effects.removeOne$).toBeObservable(expected);
        });

        it('should remove one fail', () => {
            const completion = new RemoveOneFail('Unexpected Error. Try again later.');
            const error = 'Unexpected Error. Try again later.';

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-#|', {}, error);
            const expected = cold('--b', { b: completion });
            todoService.removeOne = () => response;

            expect(effects.removeOne$).toBeObservable(expected);
        });
    });

    describe('removeMany$', () => {
        const todo1 = generateMockTodo();
        const todo2 = { ...todo1, id: 222 };
        const ids = [todo1.id, todo2.id];
        const action = new RemoveMany(ids);

        it('should remove many successful', () => {
            const completion = new RemoveManySuccess(ids);

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-a|', { a: ids });
            const expected = cold('--b', { b: completion });
            todoService.removeMany = () => response;
            expect(effects.removeMany$).toBeObservable(expected);
        });

        it('should remove many fail', () => {
            const completion = new RemoveManyFail('Unexpected Error. Try again later.');
            const error = 'Unexpected Error. Try again later.';

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-#|', {}, error);
            const expected = cold('--b', { b: completion });
            todoService.removeMany = () => response;

            expect(effects.removeMany$).toBeObservable(expected);
        });
    });

    describe('editOne$', () => {
        const todo1 = generateMockTodo();
        const todo2 = { ...todo1, id: 222 };
        const idToEdit = 222;
        const changes = { title: 'titleToEdit' };

        const action = new EditOne(idToEdit, changes);

        it('should edit one successful', () => {
            const completion = new EditOneSuccess({ id: idToEdit, changes });

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-a|', { a: { id: idToEdit, changes } });
            const expected = cold('--b', { b: completion });
            todoService.editOne = () => response;
            expect(effects.editOne$).toBeObservable(expected);
        });

        it('should edit one fail', () => {
            const completion = new EditOneFail('Unexpected Error. Try again later.');
            const error = 'Unexpected Error. Try again later.';

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-#|', {}, error);
            const expected = cold('--b', { b: completion });
            todoService.editOne = () => response;

            expect(effects.editOne$).toBeObservable(expected);
        });
    });
});
