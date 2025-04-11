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
    class="w-250px"
  >
    <el-text size="large" class="font-bold">
      {{ props.terminalInfo.name }}
    </el-text>
  </el-card>
</template>
