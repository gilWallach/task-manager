import { Task, TaskStatus } from "../models/task";
type Listener<T> = (items: T[]) => void;
declare class State<T> {
    protected listeners: Listener<T>[];
    addListener(listenerFunc: Listener<T>): void;
}
export declare class TaskState extends State<Task> {
    private tasks;
    private static instance;
    private STORAGE_KEY;
    private constructor();
    static getInstance(): TaskState;
    query(): void;
    addTask(newTask: Task): void;
    deleteTask(taskId: string): void;
    moveTask(taskId: string, newStatus: TaskStatus): void;
    updateListeners(): void;
    private updateTaskStorage;
    private demoTasks;
}
export declare const taskState: TaskState;
export {};
