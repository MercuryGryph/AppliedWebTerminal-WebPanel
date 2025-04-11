<script setup lang="ts">
import type TerminalInfo from "~/core/data/TerminalInfo"

import { ref } from 'vue'

import { fetchTerminalList } from "~/core/TerminalInfoService"
import { useAppStorage } from "~/data/AppStorage"
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
  <div class="h-full w-full">
    <div class="mx-a h-full max-w-2000px min-w-300px w-70%">
      <el-row class="m-4" justify="space-between">
        <el-text class="font-size-6 font-bold">
          Select A Terminal
        </el-text>
        <el-button
          circle
          :disabled="!appStorage.terminals && !errorOnFetching"
          @click="reloadTerminalList"
        >
          <span class="material-symbols-outlined"></span>
        </el-button>
      </el-row>
      <el-divider class="my-4" />

      <div v-if="appStorage.terminals" class="flex flex-wrap justify-center gap-4">
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
