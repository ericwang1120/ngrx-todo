import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

// ngrx
import { Store } from '@ngrx/store';
import * as fromTodos from '../../core/ngrx/todos/reducers';
import * as todo from '../../core/ngrx/todos/actions/todo';
import { Todo } from '../../core/ngrx/todos/models/todo';

@Component({
  selector: 'app-todo-page',
  styleUrls: ['./todo-page.component.scss'],
  templateUrl: './todo-page.component.html'
})
export class TodoPageComponent implements OnInit {
  public todos$: Observable<Todo[]>;
  public completedIds$: Observable<number[]>;
  public unCompletedCount$: Observable<number>;
  public selectedId$: Observable<number>;
  public loading$: Observable<Boolean>;

  constructor(
    private store: Store<fromTodos.State>
  ) {
    this.todos$ = store.select(fromTodos.getAllTodos);
    this.loading$ = store.select(fromTodos.getLoading);
    this.unCompletedCount$ = store.select(fromTodos.getUnCompletedCount);
    this.completedIds$ = store.select(fromTodos.getCompletedIds);
    this.selectedId$ = store.select(fromTodos.getSelectedId);
  }

  public ngOnInit(): void {
    this.store.dispatch(new todo.Load());
  }

  public addOne(payLoad: Todo): void {
    this.store.dispatch(new todo.AddOne(payLoad));
  }

  public removeOne(id: number): void {
    this.store.dispatch(new todo.RemoveOne(id));
  }

  public editOne(payLoad): void {
    this.store.dispatch(new todo.EditOne(payLoad.id, payLoad.changes));
  }

  public clearCompleted(ids: number[]): void {
    if (ids.length > 0) {
      this.store.dispatch(new todo.RemoveMany(ids));
    }
  }

  public selectTodo(payLoad: number): void {
    this.store.dispatch(new todo.SelectTodo(payLoad));
  }
}
