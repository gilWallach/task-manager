import { Component } from "./base-component";
export declare class UserMessage extends Component<HTMLDivElement, HTMLElement> {
    private static instance;
    message: string;
    constructor();
    static getInstance(): UserMessage;
    configure(): void;
    renderContent(): void;
    renderMessage(message: string): void;
}
export declare const userMessage: UserMessage;
