import Logger from "~/utils/Logger";

export default class LocalStorageManager<T> {
    constructor(
        private defaultValue: () => T,
        private localStorageKey: string,
        private store: Storage = window.localStorage,
    ) {
    }

    get(): T {
        Logger.info(`LocalStorageManager getting ${this.localStorageKey}`);
        const data = this.store.getItem(this.localStorageKey)
        let result: T;
        if (!data) {
            Logger.warn(`LocalStorageManager get ${this.localStorageKey} is empty, setting default.`);
            result = this.defaultValue()
            this.set(result)
        } else {
            result = JSON.parse(data)
        }
        let changed = false
        for (let resultKey of Object.keys(this.defaultValue())) {
            if (result[resultKey] === undefined) {
                result[resultKey] = this.defaultValue()[resultKey]
                changed = true
            }
        }
        if (changed) {
            this.set(result)
        }
        Logger.info(`LocalStorageManager got ${this.localStorageKey}:`)
        Logger.debug(result)
        return result
    }

    set(data: T): void {
        Logger.info(`LocalStorageManager setting ${this.localStorageKey}:`)
        Logger.debug(data)
        const json = JSON.stringify(data)
        this.store.setItem(this.localStorageKey, json)
    }
}
