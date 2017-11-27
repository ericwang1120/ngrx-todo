import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TodoPageComponent } from './todo-page.component';

// lazy loading
import { RouterModule } from '@angular/router';
import { routes } from './todo-page.routes';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '../../core/ngrx/todos/reducers';
import { TodoEffects } from '../../core/ngrx/todos/effects/todo';
import { TodoService } from '../../core/ngrx/todos/services/todo';

@NgModule({
  declarations: [
    TodoPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('todos', reducers),
    EffectsModule.forFeature([TodoEffects]),
  ],
  providers: [
    TodoService,
  ]
})
export class TodoPageModule {
}
