export interface Todo {
    id: string;
}

export function generateMockTodo(): Todo {
    return {
        id: '111',
    };
}
