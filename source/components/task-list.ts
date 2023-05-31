import { Component } from "./base-component"
import { Autobind } from "../decorators/autobind"
import { taskState } from "../state/task-state"
import { DragTarget } from "../models/drag-drop"
import { Task, TaskStatus } from "../models/task"
import { TaskItem } from "./task-item"

export class TaskList extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedTasks: Task[] = []
    sortBy: string = ``
    constructor(private type: `active` | `done`) {
        super(`task-list`, `lists-wraper`, false, `${type}-tasks`)
        this.configure()
        // state management
        this.renderContent()
        taskState.query()
    }

    @Autobind
    dragOverHandler(ev: DragEvent) {
        if (ev.dataTransfer && ev.dataTransfer.types[0] === `text/plain`) {
            ev.preventDefault()
            const listEl = this.element.querySelector(`ul`)!
            listEl.classList.add(`droppable`)
        }
    }

    @Autobind
    dropHandler(ev: DragEvent) {
        const prjId = ev.dataTransfer!.getData(`text/plain`)
        taskState.moveTask(prjId, this.type === `active` ? TaskStatus.Active : TaskStatus.Done)

        const droppableEls = document.querySelectorAll("ul")
        for (const el of droppableEls) {
            el.classList.remove(`droppable`)
        }
    }

    configure() {
        this.element.addEventListener(`dragover`, this.dragOverHandler)
        this.element.addEventListener(`dragleave`, this.dragLeaveHandler)
        this.element.addEventListener(`drop`, this.dropHandler)
        // sorting
        const selectEl = document.getElementById(`sortby`) as HTMLSelectElement
        selectEl!.id = `sortby-${this.type}`
        this.sortBy = selectEl.value
        selectEl.addEventListener(`change`, () => this.handleSortbyChange(selectEl.value))
        // state management
        taskState.addListener(this.renderFilterdTasks)
    }

    renderContent() {
        const listId = `${this.type}-task-list`
        this.element.querySelector(`ul`)!.id = listId
        this.element.querySelector(`h2`)!.textContent = this.type.toUpperCase()
    }

    @Autobind
    renderFilterdTasks(tasks: Task[]) {
        const filteredTasks = tasks.filter((prj) => {
            if (this.type === `active`) return prj.status === TaskStatus.Active
            return prj.status === TaskStatus.Done
        })
        this.assignedTasks = filteredTasks
        this.renderTasks()
    }

    private renderTasks() {
        const listEl = document.getElementById(`${this.type}-task-list`)! as HTMLUListElement
        listEl.innerHTML = ``
        //sorting
        const sortedTasks = this.assignedTasks.sort((a, b) => {
            if (this.sortBy === `priority`) return a.priority - b.priority
            return b.createdAt - a.createdAt
        })
        // rendering
        for (const prjItem of sortedTasks) {
            new TaskItem(this.element.querySelector(`ul`)!.id, prjItem)
        }
    }

    private handleSortbyChange(val: string) {
        this.sortBy = val
        this.renderTasks()
    }

    dragLeaveHandler(_ev: DragEvent) { }
}