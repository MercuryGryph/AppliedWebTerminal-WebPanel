<script setup lang="ts">

import Component, {createHtml} from "~/core/data/minecraft/Component";

import {computed, h, ref, render, watch} from "vue";
import {computedAsync} from "@vueuse/core";

const props = withDefaults(
    defineProps<{
        component: Component,
        minecraftFont?: boolean,
    }>(),
    {
        minecraftFont: false,
    }
)

const content = computedAsync(async (onCancel) => {
    const abortController = new AbortController()
    onCancel(() => {
        abortController.abort()
    })
    let inner = await createHtml(props.component)
    return h(
        "div",
        {class: classes.value},
        inner
    )
}, null)

const container = ref<HTMLElement | null>(null)

watch(content, (newVNode) => {
    if (container.value && newVNode) {
        render(newVNode, container.value)
    }
})

const classes = computed<string>(() => {
    let result: string = ""
    if (props.minecraftFont) {
        result += "minecraft-font "
    }
    return result
})

</script>

<template>
    <component :is="content"/>
</template>
