import { Validatable } from "../util/validation"

export class ValidationCriteria {
    constructor(
        public enteredTitle: string, 
        public enteredDescription: string, 
        public enteredpriority: number) { }

    titleValidatable: Validatable = {
        field: `title`,
        value: this.enteredTitle,
        isRequired: true,
    }
    descriptionValidatable: Validatable = {
        field: `description`,
        value: this.enteredDescription,
        isRequired: true,
        minLength: 5
    }
    priorityValidatable: Validatable = {
        field: `priority`,
        value: this.enteredpriority,
        isRequired: true,
        min: 1,
        max: 5
    }
}