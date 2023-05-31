import { Component } from "./base-component";
import { Task } from "../models/task";
import { Draggable } from "../models/drag-drop";
export declare class TaskItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private task;
    constructor(hostId: string, task: Task);
    dragStartHandler(ev: DragEvent): void;
    configure(): void;
    renderContent(): void;
    private onDeleteTask;
    dragEndHandler(_ev: DragEvent): void;
}
