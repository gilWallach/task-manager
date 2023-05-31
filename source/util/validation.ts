import { userMessage } from "../components/user-message"

    // ----- VALIDATION -----
    export interface Validatable {
        field: string
        value: string | number
        isRequired?: boolean
        minLength?: number
        maxLength?: number
        min?: number
        max?: number
    }

    export function validate(validationInput: Validatable) {
        let isValid = true
        let message = 'Invalid Input:'
        const { value, field, isRequired, minLength, maxLength, min, max } = validationInput
        if (isRequired) {
            isValid = isValid && value.toString().trim().length !== 0
            message += isValid ? `` : `\n${field} is required`
        }
        if (minLength != null && typeof value === `string`) {
            isValid = isValid && value.length >= minLength
            message += isValid ? `` : `\n${field} needs a minimun of ${minLength} characters`
        }
        if (maxLength != null && typeof value === `string`) {
            isValid = isValid && value.length <= maxLength
            message += isValid ? `` : `\n${field} can have a maximun of ${maxLength} characters`
        }
        if (min != null && typeof value === `number`) {
            isValid = isValid && value >= min
            message += isValid ? `` : `\n${field} can have a minimun value of ${min}`
        }
        if (max != null && typeof value === `number`) {
            isValid = isValid && value <= max
            message += isValid ? `` : `\n${field} can have a maximum value of ${max}`
        }
        if(!isValid) userMessage.renderMessage(message)
        return isValid
    }