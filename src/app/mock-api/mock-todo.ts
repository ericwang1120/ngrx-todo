import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemTodoService implements InMemoryDbService {
    createDb() {
        const todos = [
            { id: 1, title: 'todo1', completed: true },
            { id: 2, title: 'todo2', completed: false },
            { id: 3, title: 'todo3', completed: true },
            { id: 4, title: 'todo4', completed: false }
        ];
        return { todos };
    }
}
