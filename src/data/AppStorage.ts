import { defineStore } from "pinia";
import WebSocketService from "~/core/WebSocketService";

interface AppStorage {
  webSocketService: WebSocketService;
  
}

export default AppStorage

export const useAppStorage = defineStore('appStorage', {
  state: (): AppStorage => ({
    webSocketService: new WebSocketService(),
  })
})
