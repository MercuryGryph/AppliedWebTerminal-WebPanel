import type TerminalInfo from "~/core/data/terminal/TerminalInfo"
import type LocalConfig from "~/data/LocalConfig";

import {defineStore} from "pinia"

import WebSocketService from "~/core/WebSocketService"
import {defaultLocalConfigValue} from "~/data/LocalConfig";
import LocalStorageManager from "~/data/LocalStorageManager";


interface AppStorage {
    readonly localConfigStoreManager: LocalStorageManager<LocalConfig>
    webSocketService: WebSocketService
    terminals?: Array<TerminalInfo>
    currentTerminal?: TerminalInfo
    token?: string
    inTerminalPage: boolean
}

export default AppStorage

export function defaultAppStorageValue(): AppStorage {
    return {
        localConfigStoreManager: new LocalStorageManager<LocalConfig>(
            defaultLocalConfigValue,
            'LocalStorage',
        ),
        webSocketService: new WebSocketService(),
        inTerminalPage: false,
    }
}

export const useAppStorage = defineStore('appStorage', {
    state: (): AppStorage => (defaultAppStorageValue()),
})
