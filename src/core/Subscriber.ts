export type Consumer<T> = ((it: T) => void)

export class Subscriber<T> {
    private listeners = Array<Consumer<T>>()

    constructor() {
    }

    public subscribe(cons: Consumer<T>) {
        this.listeners.push(cons)
    }

    public accept(t: T) {
        this.listeners.forEach(it => it(t))
    }

    public remove(cons: Consumer<T>) {
        this.listeners.filter(it => it !== cons)
    }
}