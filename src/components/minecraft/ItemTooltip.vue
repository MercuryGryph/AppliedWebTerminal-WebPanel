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
    <el-card class="w-fit rounded-xl backdrop-blur-md b-4" style="background: var(--app-tooltip-color)">
        <JsonTextSpan :json-text="props.text" class="px-4" />
        <el-divider v-if="props.tooltips.length" class="m-0 my-2 b-3" style="border-color: var(--app-divider-border)" />
        <el-text v-for="tooltip in props.tooltips" :key="tooltip" type="info" class="my-2 block">
            {{ tooltip }}
        </el-text>
    </el-card>
</template>

<style scoped>

</style>