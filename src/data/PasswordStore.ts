import {defineStore} from "pinia";

export const usePasswordStore = defineStore('password', {
    state: () => ({
        passwords: new Map<string, string>()
    }),
    actions: {
        getPassword(
            uuid: string,
        ): string | undefined {
            const mem = this.passwords.get(uuid)
            if (mem) {
                return mem
            }
            const stored = localStorage.getItem(`password/terminal/${uuid}`);
            if (stored) {
                this.passwords.set(uuid, stored)
                return stored
            }
            return undefined
        },
        storePassword(
            uuid: string,
            password: string,
        ) {
            this.passwords.set(uuid, password);
            localStorage.setItem(`password/terminal/${uuid}`, password);
        }
    }
})
