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

  constructor(
    private store: Store<fromTodos.State>
  ) {
    this.todos$ = store.select(fromTodos.getAllTodos);
  }

  public ngOnInit(): void {
    this.store.dispatch(new todo.Load());
  }
}
