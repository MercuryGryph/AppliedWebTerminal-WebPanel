<script setup lang="ts">
import type JsonText from "~/core/data/minecraft/JsonText";

const props = withDefaults(defineProps<{
    text: JsonText
    tooltips: string[]
}>(), {
    tooltips: () => new Array<string>()
})
</script>

<template>
    <el-card class="w-fit b-4 rounded-xl backdrop-blur-md" style="background: var(--app-tooltip-color)">
        <JsonTextSpan :json-text="props.text" class="mx-a block w-full px-4 text-center" />
        <el-divider v-if="props.tooltips.length" class="m-0 my-2 b-3" style="border-color: var(--app-divider-border)" />
        <el-text v-for="tooltip in props.tooltips" :key="tooltip" type="info" class="my-2 block">
            {{ tooltip }}
        </el-text>
    </el-card>
</template>
