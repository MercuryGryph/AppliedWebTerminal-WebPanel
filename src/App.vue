<script setup lang="ts">

import { useAppStorage } from "~/data/AppStorage";
import { useConfig } from "~/data/Config";
import { fetchServerConfig } from "~/data/ServerConfig";

import MainPage from "~/pages/MainPage.vue";
import TerminalPage from "~/pages/TerminalPage.vue";

const config = useConfig()

fetchServerConfig((it)=>{
  config.serverConfig = it
  document.title = config.serverConfig.title
})

const appStorage = useAppStorage()

</script>

<template>
  <el-col class="h-full min-h-100vh w-full">
    <TopBar />
    <div v-if="appStorage.inTerminal">
      <TerminalPage />
    </div>
    <div v-else>
      <MainPage />
    </div>
  </el-col>
</template>
