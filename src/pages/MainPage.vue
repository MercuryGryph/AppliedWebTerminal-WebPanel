<script setup lang="ts">
import type TerminalInfo from "~/core/data/terminal/TerminalInfo"

import {ref} from 'vue'

import {fetchTerminalList} from "~/core/TerminalUtils"
import {useAppStorage} from "~/data/AppStorage"
import DialogTerminalLogin from "~/pages/DialogTerminalLogin.vue";
import Logger from "~/utils/Logger"

const appStorage = useAppStorage()

const errorOnFetching = ref(false)

function reloadTerminalList() {
    fetchTerminalList().then((data) => {
        appStorage.terminals = data
    }).catch((error) => {
        Logger.error('Error while reloading terminals list:')
        Logger.error(error)
        errorOnFetching.value = true
    })
}

reloadTerminalList()

function onSelectTerminal(
    terminalInfo: TerminalInfo
) {
    appStorage.currentTerminal = terminalInfo
    Logger.info('Selected Terminal: ')
    Logger.info(terminalInfo)
}

</script>

<template>
    <div>
        <div v-if="appStorage.currentTerminal">
            <DialogTerminalLogin />
        </div>
        <div class="mx-a h-full max-w-2000px min-w-300px w-70%">
            <el-row class="mx-4 my-2" justify="space-between">
                <el-text size="large" class="font-bold">
                    Select A Terminal
                </el-text>
                <el-button
                    circle
                    :disabled="!appStorage.terminals && !errorOnFetching"
                    @click="reloadTerminalList"
                >
                    <span class="material-symbols-outlined">
                        refresh
                    </span>
                </el-button>
            </el-row>
            <el-divider class="my-1" />

            <div v-if="appStorage.terminals" class="m-4 flex flex-wrap items-stretch justify-center gap-4">
                <div v-for="term in appStorage.terminals!!" :key="term.uuid">
                    <TerminalInfoCard :terminal-info="term" :on-click="onSelectTerminal" />
                </div>
            </div>

            <div v-else-if="errorOnFetching">
                Error while loading terminals list!
            </div>

            <div v-else>
                loading...
            </div>
        </div>
    </div>
</template>
