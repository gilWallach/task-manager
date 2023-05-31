import { Validatable } from "../util/validation";
export declare class ValidationCriteria {
    enteredTitle: string;
    enteredDescription: string;
    enteredpriority: number;
    constructor(enteredTitle: string, enteredDescription: string, enteredpriority: number);
    titleValidatable: Validatable;
    descriptionValidatable: Validatable;
    priorityValidatable: Validatable;
}
