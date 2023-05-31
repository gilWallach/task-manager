import { Component } from "./base-component";
export declare class TaskInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLInputElement;
    priorityInputEl: HTMLInputElement;
    constructor();
    configure(): void;
    private gatherUserInput;
    private clearInputs;
    private submitHandler;
    renderContent(): void;
}
