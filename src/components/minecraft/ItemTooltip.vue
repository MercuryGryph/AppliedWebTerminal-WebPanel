<script setup lang="ts">
import JsonText from "~/core/data/minecraft/JsonText";

const props = withDefaults(defineProps<{
    text: JsonText
    tooltips: string[]
}>(), {
    tooltips: () => new Array<string>()
})
</script>

<template>
    <el-card class="w-fit rounded-xl backdrop-blur-md" style="background: var(--app-tooltip-color)">
        <JsonTextSpan :json-text="props.text" class="px-4"/>
        <el-divider v-if="props.tooltips.length" class="m-0 my-2 b-3" style="border-color: var(--app-divider-border)"/>
        <el-text type="info" v-for="tooltip in props.tooltips" class="block my-2">
            {{ tooltip }}
        </el-text>
    </el-card>
</template>

<style scoped>

</style>