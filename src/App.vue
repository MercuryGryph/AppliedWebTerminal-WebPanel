<script setup lang="ts">

import { useConfig } from "~/data/Config";
import { fetchServerConfig } from "~/data/ServerConfig";
import MainPage from "~/pages/MainPage.vue";

const config = useConfig()

fetchServerConfig((it)=>{
  config.serverConfig = it
  document.title = config.serverConfig.title
})

</script>

<template>
  <el-col class="h-full min-h-100vh w-full">
    <TopBar />
    <MainPage />
  </el-col>
</template>
