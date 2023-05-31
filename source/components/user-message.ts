import { Component } from "./base-component";

export class UserMessage extends Component<HTMLDivElement, HTMLElement>{
    private static instance: UserMessage
    message: string = ``
    constructor() {
        super(`user-message`, `app`, true)
    }

    static getInstance() {
        if (this.instance) return this.instance
        this.instance = new UserMessage()
        return this.instance
    }

    configure(): void { }

    renderContent(): void {}

    renderMessage(message: string) {
        const messageEl = document.getElementById(`message`)! as HTMLElement
        messageEl.innerText = message
        const messageWrapperEl = document.getElementById('user-message-wraper') as HTMLElement
        messageWrapperEl.classList.add('open')
        setTimeout(() => {
            messageEl.innerText = ``
            messageWrapperEl.classList.remove('open')
        }, 3000)
    }
}
export const userMessage = UserMessage.getInstance()