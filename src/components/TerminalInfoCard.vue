<script setup lang="ts">

import type TerminalInfo from "~/core/data/TerminalInfo";

const props = defineProps<{
  terminalInfo: TerminalInfo,
  onClick: (terminalInfo: TerminalInfo) => void,
}>()

</script>

<template>
  <el-card
    shadow="hover"
    @click="() => { props.onClick(props.terminalInfo) }"
    class="w-260px"
  >
    <el-text size="large" truncated class="block w-80% font-bold">
      {{ props.terminalInfo.name }}
    </el-text>
    <el-text type="info" class="jetbrains-mono-regular mt-1 block font-size-10px">
      {{ props.terminalInfo.uuid }}
    </el-text>
  </el-card>
</template>
