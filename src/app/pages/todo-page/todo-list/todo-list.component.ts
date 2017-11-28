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
  @Input('selectedId') selectedId: number;
  @Output('removeOne') removeOne = new EventEmitter();
  @Output('editOne') editOne = new EventEmitter();
  @Output('selectTodo') selectTodo = new EventEmitter();

  toggleCompletion(todo: Todo) {
    const obj = {
      id: todo.id,
      changes: {
        completed: !todo.completed
      }
    };

    this.editOne.emit(obj);
  }

  updateTitle(todo: Todo, title: string) {
    const obj = {
      id: todo.id,
      changes: {
        title: title
      }
    };

    this.editOne.emit(obj);
  }
}
