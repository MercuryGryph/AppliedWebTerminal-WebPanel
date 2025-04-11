import type ServerConfig from "~/data/ServerConfig";
import { defineStore } from "pinia";

interface Config {
  serverConfig: ServerConfig
}

export default Config

export const useConfig = defineStore('appConfig', {
  state: (): Config => ({
    serverConfig: {
      useWss: false,
      title: 'Applied Web Terminal',
    }
  }),
})
