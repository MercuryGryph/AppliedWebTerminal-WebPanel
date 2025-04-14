<script setup lang="ts">
import {watch} from "vue";

import {useAppStorage} from "~/data/AppStorage";
import {useConfig} from "~/data/Config";
import {fetchServerConfig} from "~/data/ServerConfig";
import MainPage from "~/pages/MainPage.vue";
import TerminalPage from "~/pages/TerminalPage.vue";

const config = useConfig()

fetchServerConfig((it) => {
    config.serverConfig = it
    document.title = config.serverConfig.title
})

const appStorage = useAppStorage()

watch(config.localConfig, () => {
    appStorage.localConfigStoreManager.set(config.localConfig)
})

</script>

<template>
    <el-col class="h-full min-h-100vh w-full flex flex-col items-stretch">
        <TopBar />

        <TerminalPage v-if="appStorage.inTerminalPage" class="grow" />
        <MainPage v-else class="grow" />
    </el-col>
</template>
