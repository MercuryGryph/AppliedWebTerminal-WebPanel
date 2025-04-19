<script setup lang="ts">
import type Component from "~/core/data/minecraft/Component";

const props = withDefaults(defineProps<{
    text: Component
    tooltips: Component[]
}>(), {
    tooltips: () => new Array<Component>()
})
</script>

<template>
    <el-card class="w-fit b-4 rounded-xl backdrop-blur-md" style="background: var(--app-tooltip-color)">
        <ComponentView :component="props.text" class="mx-a block w-full px-4 text-center" />
        <el-divider v-if="props.tooltips.length" class="m-0 my-2 b-3" style="border-color: var(--app-divider-border)" />
        <el-text v-for="(tooltip, index) in props.tooltips" :key="index" type="info" class="my-2 block">
            <ComponentView :component="tooltip"/>
        </el-text>
    </el-card>
</template>
