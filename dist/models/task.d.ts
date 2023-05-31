export declare enum TaskStatus {
    Active = 0,
    Done = 1
}
export declare class Task {
    title: string;
    description: string;
    priority: number;
    status: TaskStatus;
    createdAt: number;
    id?: string | undefined;
    constructor(title: string, description: string, priority: number, status: TaskStatus, createdAt: number, id?: string | undefined);
}
