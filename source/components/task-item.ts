import { Autobind } from "../decorators/autobind"
import { Component } from "./base-component"
import { Task } from "../models/task"
import { Draggable } from "../models/drag-drop"
import { taskState } from "../state/task-state"
import { formatDateTime } from "../util/format-date-time"

export class TaskItem extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    private task: Task

    constructor(hostId: string, task: Task) {
        super(`single-task`, hostId, false, task.id!)
        this.task = task
        this.configure()
        this.renderContent()        
    }

    @Autobind
    dragStartHandler(ev: DragEvent) {
        ev.dataTransfer!.setData(`text/plain`, this.task.id!)
        ev.dataTransfer!.effectAllowed = `move`
    }

    configure() {      
        document.getElementById(`delete-btn`)!.id = `delete-btn-${this.task.id!}`
        document.getElementById(`delete-btn-${this.task.id!}`)!.onclick = () => this.onDeleteTask(this.task.id!)

        this.element.addEventListener(`dragstart`, this.dragStartHandler)
        this.element.addEventListener(`dragend`, this.dragEndHandler)
    }

    renderContent() {
        this.element.querySelector(`h3`)!.textContent = this.task.title
        this.element.querySelector(`h4`)!.textContent = `Priority: ` + this.task.priority
        this.element.querySelector(`h5`)!.textContent = formatDateTime(this.task.createdAt)
        this.element.querySelector(`p`)!.textContent = this.task.description
    }

    private onDeleteTask(taskId: string) {       
        taskState.deleteTask(taskId)
    }

    dragEndHandler(_ev: DragEvent) {
    }
}