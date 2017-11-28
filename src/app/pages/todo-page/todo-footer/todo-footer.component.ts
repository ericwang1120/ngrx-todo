import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent {
  @Output('clearCompleted') clearCompleted = new EventEmitter();
  @Input('completedIds') completedIds: number[];
  @Input('unCompletedCount') unCompletedCount: number;
}
