<script setup lang="ts">

import Component, {createHtml} from "~/core/data/minecraft/Component";

import {computed, h, ref} from "vue";
import {useConfig} from "~/data/Config";
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

const content = computedAsync(async () => {
    let a = h(
        "div",
        {class: classes},
        await createHtml(props.component)
    )
    console.log(a)
    return a
})

const contentRef = ref()

const config = useConfig()

const classes = computed<string>(() => {
    let result: string = ""
    if (props.minecraftFont) {
        result += "minecraft-font "
    }
    return result
})

</script>

<template>
    <div>
        {{ content }}
    </div>
</template>
