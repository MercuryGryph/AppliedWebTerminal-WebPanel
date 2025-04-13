<script setup lang="ts">
import { isDark, toggleDark } from "~/composables/dark";
import { useAppStorage } from "~/data/AppStorage";
import { useConfig } from "~/data/Config";

const config = useConfig()
const appStorage = useAppStorage()

function pageBackToRoot(): void {
  appStorage.inTerminalPage = false
  appStorage.currentTerminal = undefined
}

</script>

<template>
  <div class="w-full">
    <el-row justify="space-between" class="my-2 h-full w-full">
      <el-row class="h-full w-fit">
        <el-button
          v-if="appStorage.inTerminalPage"
          circle
          class="my-a ml-2"
          @click="pageBackToRoot"
        >
          <span class="material-symbols-outlined">
            arrow_back
          </span>
        </el-button>

        <el-text type="primary" class="mx-2 my-a font-bold">
          {{ config.serverConfig.title }}
        </el-text>
        <el-divider direction="vertical" class="my-a h-6" />
      </el-row>
      
      <el-row>
        <el-button
          circle
          class="float-right my-a mr-2"
          @click="toggleDark"
        >
          <span v-if="isDark" class="material-symbols-outlined">
            dark_mode
          </span>
          <span v-else class="material-symbols-outlined">
            light_mode
          </span>
        </el-button>
      </el-row>
    </el-row>
  </div>
  <el-divider class="my-0" />
</template>
