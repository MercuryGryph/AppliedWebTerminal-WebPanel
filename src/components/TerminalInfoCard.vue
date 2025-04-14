<script setup lang="ts">

import type TerminalInfo from "~/core/data/terminal/TerminalInfo";

const props = defineProps<{
    terminalInfo: TerminalInfo,
    onClick: (terminalInfo: TerminalInfo) => void,
}>()

</script>

<template>
    <el-card
        shadow="hover"
        class="w-260px"
        @click="() => { props.onClick(props.terminalInfo) }"
    >
        <el-text size="large" truncated class="block w-80% font-bold">
            {{ props.terminalInfo.name }}
        </el-text>
        <el-text type="info" class="jetbrains-mono-regular mt-1 block font-size-10px">
            {{ props.terminalInfo.uuid }}
        </el-text>
    </el-card>
</template>
