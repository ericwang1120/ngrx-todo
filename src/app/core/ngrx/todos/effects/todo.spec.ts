import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { empty } from 'rxjs/observable/empty';
import { TodoEffects, LOAD_SCHEDULER, LOAD_DEBOUNCE } from './todo';
import { TodoService } from '../services/todo';
import { Observable } from 'rxjs/Observable';
import { Load, LoadSuccess, LoadFail } from '../actions/todo';
import { Todo, generateMockTodo } from '../models/todo';

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
                    useValue: jasmine.createSpyObj('todoService', ['load']),
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
            const todo2 = { ...todo1, id: '222' };
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
});
