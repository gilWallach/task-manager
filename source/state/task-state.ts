import { userMessage } from "../components/user-message"
import { Task, TaskStatus } from "../models/task"
import { localStorageService } from "../services/storage-service"
import { makeId } from "../util/makeId"
// STATE MANAGEMENT
type Listener<T> = (items: T[]) => void

class State<T> {
    protected listeners: Listener<T>[] = []
    addListener(listenerFunc: Listener<T>) {
        this.listeners.push(listenerFunc)
    }
}

export class TaskState extends State<Task>{
    private tasks: Task[] = []
    private static instance: TaskState
    private STORAGE_KEY = 'tasksDB'

    private constructor() {
        super()
    }

    static getInstance() {
        if (this.instance) return this.instance
        this.instance = new TaskState()
        return this.instance
    }

    query() {
        this.tasks = localStorageService.loadFromStorage(this.STORAGE_KEY)
        if (!this.tasks || !this.tasks.length) {
            this.tasks = this.demoTasks
            this.updateTaskStorage(this.tasks)
        }
        this.updateListeners()
    }

    addTask(newTask: Task) {
        if(!newTask.id) newTask.id = makeId()
        // update state
        this.tasks.push(newTask)
        this.updateListeners()
        userMessage.renderMessage(`Task Added Successfully`)

        this.updateTaskStorage(this.tasks)
    }

    deleteTask(taskId: string) {
        const taskIdx = this.tasks.findIndex(task => task.id === taskId)
        this.tasks.splice(taskIdx, 1)
        this.updateListeners()
        userMessage.renderMessage(`Task Removed Successfully`)

        this.updateTaskStorage(this.tasks)
    }

    moveTask(taskId: string, newStatus: TaskStatus) {
        const task = this.tasks.find(prj => prj.id === taskId)
        if (task && task.status !== newStatus) {
            task.status = newStatus
            this.updateListeners()
            this.updateTaskStorage(this.tasks)
        }
    }

    updateListeners() {
        for (const listenerFunc of this.listeners) {
            listenerFunc(this.tasks.slice())
        }
    }

    private updateTaskStorage(data: Task[]) {
        localStorageService.saveToStorage(this.STORAGE_KEY, data)
    }
    
    private demoTasks: Task[] = [
        {
            id: makeId(),
            title: `Create your first task`,
            description: `Check it out! Create, edit & delete tasks`,
            priority: 1,
            status: TaskStatus.Active,
            createdAt: Date.now()
        }
    ]
}
export const taskState = TaskState.getInstance()