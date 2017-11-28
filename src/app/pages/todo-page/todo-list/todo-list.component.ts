import { Todo } from './../../../core/ngrx/todos/models/todo';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input('todos') todos: Todo[];
  @Input('loading') loading: Boolean;
  @Output('removeOne') removeOne = new EventEmitter();
}
