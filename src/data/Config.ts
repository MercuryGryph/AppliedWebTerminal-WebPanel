import type LocalConfig from "~/data/LocalConfig";
import type ServerConfig from "~/data/ServerConfig";
import { defineStore } from "pinia";
import { defaultAppStorageValue } from "~/data/AppStorage";
import { defaultServerConfigValue } from "~/data/ServerConfig";

interface Config {
  localConfig: LocalConfig
  serverConfig: ServerConfig
}

export default Config

export function defaultConfigValue(): Config {
  return {
    localConfig: defaultAppStorageValue().localConfigStoreManager.get(),
    serverConfig: defaultServerConfigValue(),
  }
}

export const useConfig = defineStore('appConfig', {
  state: (): Config => (defaultConfigValue()),
})
