export interface Validatable {
    field: string;
    value: string | number;
    isRequired?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}
export declare function validate(validationInput: Validatable): boolean;
