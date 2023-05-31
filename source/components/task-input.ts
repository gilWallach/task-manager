// TODO: return a Task
import { Component } from "./base-component"
import { validate } from "../util/validation"
import { Autobind } from "../decorators/autobind"
import { taskState } from "../state/task-state"
import { Task, TaskStatus } from "../models/task"
import { ValidationCriteria } from "../models/validation-criteria"

export class TaskInput extends Component<HTMLDivElement, HTMLFormElement> {
    //input fields
    titleInputEl: HTMLInputElement
    descriptionInputEl: HTMLInputElement
    priorityInputEl: HTMLInputElement

    constructor() {
        super(`task-input`, `task-form-wraper`, true, `user-input`)
        // selection logic
        this.titleInputEl = this.element.querySelector(`#title`) as HTMLInputElement
        this.descriptionInputEl = this.element.querySelector(`#description`) as HTMLInputElement
        this.priorityInputEl = this.element.querySelector(`#priority`) as HTMLInputElement

        this.configure()
    }

    configure() {
        this.element.addEventListener(`submit`, this.submitHandler)
    }

    private gatherUserInput(): Task | void {
        const enteredTitle = this.titleInputEl.value
        const enteredDescription = this.descriptionInputEl.value
        const enteredpriority = +this.priorityInputEl.value
        // input validation criteria
        const validationCriteria = new ValidationCriteria(enteredTitle, enteredDescription, enteredpriority)        
        const {titleValidatable, descriptionValidatable, priorityValidatable} = validationCriteria
        // input validation
        if (validate(titleValidatable) &&
            validate(descriptionValidatable) &&
            validate(priorityValidatable)) {
            this.clearInputs()
            return new Task(enteredTitle, enteredDescription, enteredpriority, TaskStatus.Active, Date.now())
        }
    }

    private clearInputs() {
        this.titleInputEl.value = ``
        this.descriptionInputEl.value = ``
        this.priorityInputEl.value = ``
    }

    @Autobind
    private submitHandler(ev: Event) {
        ev.preventDefault()
        const userInput = this.gatherUserInput()
        if (userInput) taskState.addTask(userInput)
    }

    renderContent(): void { }
}