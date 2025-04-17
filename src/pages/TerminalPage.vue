<script setup lang="ts">

import {onUnmounted, ref} from "vue";
import {fetchCpuStatus} from "~/core/AeUtils";
import {tr} from "~/core/I18nService";
import {useAppStorage} from "~/data/AppStorage";
import CraftingPage from "~/pages/terminal/CraftingPage.vue";
import StoragePage from "~/pages/terminal/StoragePage.vue";

const appStorage = useAppStorage()

enum Page {
    Storage, Crafting
}

const selectedPage = ref<Page>(Page.Storage);
const currentBusyCpu = ref<number | undefined>()

function refreshCpuStatus() {
    fetchCpuStatus(appStorage.token!).then(it => {
        if (it) {
            const busyCount = it.filter(it1 => it1.busy).length
            currentBusyCpu.value = busyCount === 0 ? undefined : busyCount
        }
    })
}

const intervalID = setInterval(refreshCpuStatus, 1000)

onUnmounted(() => {
    clearInterval(intervalID)
})

</script>

<template>
    <div class="terminal_page m-4 mx-a max-w-1000px min-w-300px w-80% font-bold">
        <el-card class="z-500 bg-transparent backdrop-blur-lg">
            <el-row justify="space-between">
                <el-row>
                    <el-text size="large" type="primary">
                        {{ appStorage.currentTerminal!.name }}
                    </el-text>
                </el-row>

                <el-row class="float-right mx-4">
                    <el-button-group>
                        <el-button
                            :type="selectedPage === Page.Storage ? 'primary' : 'default'"
                            :disabled="selectedPage === Page.Storage"
                            @click="() => { selectedPage = Page.Storage }"
                        >
                            {{ tr('terminal.button.storage_page') }}
                        </el-button>
                        <el-badge :value="currentBusyCpu" :max="99" type="info">
                            <el-button
                                :type="selectedPage === Page.Crafting ? 'primary' : 'default'"
                                :disabled="selectedPage === Page.Crafting"
                                @click="() => { selectedPage = Page.Crafting }"
                            >
                                {{ tr('terminal.button.crafting_page') }}
                            </el-button>
                        </el-badge>
                    </el-button-group>
                </el-row>
            </el-row>
        </el-card>
        <div>
            <StoragePage v-if="selectedPage === Page.Storage"/>
            <CraftingPage v-else-if="selectedPage === Page.Crafting"/>
        </div>
    </div>
</template>
