import type TerminalInfo from "~/core/data/TerminalInfo"
import { defineStore } from "pinia"
import WebSocketService from "~/core/WebSocketService"

interface AppStorage {
  webSocketService: WebSocketService
  terminals?: Array<TerminalInfo>
  currentTerminal?: TerminalInfo
  inTerminal: boolean
}

export default AppStorage

export const useAppStorage = defineStore('appStorage', {
  state: (): AppStorage => ({
    webSocketService: new WebSocketService(),
    inTerminal: false,
  })
})
