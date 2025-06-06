<script setup lang="ts">
import type MEStack from "~/core/data/ae/core/MEStack";
import {useThrottleFn} from "@vueuse/core";
import {computed, ref} from "vue";
import Component from "~/core/data/minecraft/Component";
import {tr} from "~/core/I18nService";
import {formatNumber} from "~/core/NumberUtil";
import Logger from "~/utils/Logger";

const props = defineProps<{
    stack: MEStack
}>()

const displayName = computed<Component | undefined>(() => {
    const raw = props.stack.what.displayName
    try {
        const jsonText = JSON.parse(raw)
        if (jsonText) {
            return jsonText
        }
    } catch (error) {
        Logger.warn(error)
    }
    return undefined
})

const showTooltip = ref(false)
const mousePosition = ref({
    x: 0,
    y: 0
})

const hoverElement = ref<any>(null)

const onMouseMove = useThrottleFn((e: MouseEvent) => {
    const {x, y} = e
    if (hoverElement.value) {
        const rect = hoverElement.value.getBoundingClientRect()
        showTooltip.value = (
            x >= rect.left && x <= rect.right &&
            y >= rect.top && y <= rect.bottom
        );
    }
    mousePosition.value = {x, y}
}, 100)

const tooltipStyle = computed<string>(() => {
    return `position: fixed; left: ${mousePosition.value.x + 10}px; top: ${mousePosition.value.y + 10}px;`
})

const tooltips = computed(() => {
    const result = new Array<Component>()
    if (props.stack.amount) {
        result.push((Component.literal(tr('ae.tooltip.stored', props.stack.amount.toLocaleString()))))
    }
    if (props.stack.craftable) {
        result.push(Component.literal(`${tr('ae.tooltip.craftable')}`))
    }
    return result
})

const keyImageUrl = computed(() => {
    return `/aeResource/${props.stack.what.type}/${props.stack.what.id}`
})

</script>

<template>
    <div
        ref="hoverElement"
        class="stack-container relative h-64px w-64px"
        v-bind="$attrs"
        @mouseleave="showTooltip = false"
        @mousemove="onMouseMove"
    >
        <img
            class="h-100% w-100%"
            :alt="props.stack.what.id"
            :src="keyImageUrl"
        >
        <el-text class="absolute pos-bottom-2px pos-right-2px" size="small">
            {{ (!props.stack.amount && props.stack.craftable) ? tr("ae.tooltip.craft") : (props.stack.amount ? formatNumber(props.stack.amount) : '') }}
        </el-text>
        <el-text v-if="props.stack.craftable" class="absolute pos-left-2px pos-top-0px">
            +
        </el-text>
    </div>
    <Teleport to=".terminal_page">
        <ItemTooltip
            v-if="displayName"
            v-show="showTooltip"
            :tooltips="tooltips"
            :style="tooltipStyle"
            :text="displayName"
            class="z-10000"
        />
    </Teleport>
</template>

<style scoped>
.stack-container:hover {
    background-color: var(--app-mestack-hover-color);
}
</style>