export declare abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateEl: HTMLTemplateElement;
    hostEl: T;
    element: U;
    constructor(templateID: string, hostElId: string, insertAtStart: boolean, newElId?: string);
    private attach;
    abstract configure(): void;
    abstract renderContent(): void;
}
