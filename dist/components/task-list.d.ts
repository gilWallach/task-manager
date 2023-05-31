import { Component } from "./base-component";
import { DragTarget } from "../models/drag-drop";
import { Task } from "../models/task";
export declare class TaskList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    private type;
    assignedTasks: Task[];
    sortBy: string;
    constructor(type: `active` | `done`);
    dragOverHandler(ev: DragEvent): void;
    dropHandler(ev: DragEvent): void;
    configure(): void;
    renderContent(): void;
    renderFilterdTasks(tasks: Task[]): void;
    private renderTasks;
    private handleSortbyChange;
    dragLeaveHandler(_ev: DragEvent): void;
}
