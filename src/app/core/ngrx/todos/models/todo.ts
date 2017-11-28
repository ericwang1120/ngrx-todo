export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export function generateMockTodo(): Todo {
    return {
        id: 111,
        title: 'todo1',
        completed: true
    };
}
