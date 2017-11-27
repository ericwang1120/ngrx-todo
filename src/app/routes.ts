import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: './pages/todo-page/todo-page.module#TodoPageModule',
    }
];
