import LocalConfig from "~/data/LocalConfig";

export type Consumer<T> = ((it: T) => void)

export class Subscriber<T> {
    private listeners = new Array<Consumer<T>>()

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

export let ConfigSubsciber = new Subscriber<LocalConfig>()