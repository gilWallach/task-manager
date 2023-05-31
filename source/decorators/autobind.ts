// ----- AUTOBIND UTIL DECORATOR -----
export function Autobind(_1: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        // enumerable: false,
        get() {
            const boundFunc = originalMethod.bind(this)
            return boundFunc
        }
    }
    return adjDescriptor
}