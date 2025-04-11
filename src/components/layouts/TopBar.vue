<script setup lang="ts">
import { isDark, toggleDark } from "~/composables/dark";
import { useConfig } from "~/data/Config";

const config = useConfig()

</script>

<template>
  <div class="h-60px w-full">
    <el-row justify="space-between" class="h-full w-full">
      <el-row class="h-full w-fit">
        <el-text type="primary" class="mx-4 my-a font-size-6 font-bold">
          {{ config.serverConfig.title }}
        </el-text>
        <el-divider direction="vertical" class="my-a h-8" />
      </el-row>
      
      <el-row>
        <el-button
          circle
          class="float-right my-a mr-4"
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
