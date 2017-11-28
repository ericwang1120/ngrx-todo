import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-add-bar',
  templateUrl: './todo-add-bar.component.html',
  styleUrls: ['./todo-add-bar.component.css']
})
export class TodoAddBarComponent {
  @Output('addOne') addOne = new EventEmitter();
  public onAdd(title: string): void {
    const obj = { title: title, completed: false };
    this.addOne.emit(obj);
  }
}
