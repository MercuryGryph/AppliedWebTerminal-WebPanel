<script setup lang="ts">
import type MEStack from "~/core/data/ae/core/MEStack";
import {computed, ref} from "vue";
import {formatNumber} from "~/core/NumberUtil";
import type jsonText from "~/core/data/minecraft/JsonText";
import Logger from "~/utils/Logger";
import {tr} from "~/core/I18nService";
import {useThrottleFn} from "@vueuse/core";

const props = withDefaults(defineProps<{
    stack: MEStack
    craftable: boolean
}>(), {
    craftable: false
})

const displayName = computed<jsonText | undefined>(() => {
    const raw = props.stack.what.displayName
    try {
        const jsonText = JSON.parse(raw)
        if (jsonText) {
            Logger.info(jsonText)
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
    mousePosition.value = {
        x: x,
        y: y
    }
}, 100)

const tooltipStyle = computed<string>(() => {
    return `position: absolute; left: ${mousePosition.value.x + 10}px; top: ${mousePosition.value.y + 10}px;`
})

const tooltips = computed(() => {
    const result = new Array<string>()
    if (props.stack.amount) {
        result.push(`${tr('ae.tooltip.stored')} ${props.stack.amount.toLocaleString()}`)
    }
    if (props.craftable) {
        result.push(`${tr('ae.tooltip.craftable')}`)
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
        class="h-64px w-64px relative stack-container"
        @mouseleave="showTooltip = false"
        @mousemove="onMouseMove"
    >
        <img
            class="w-100% h-100%"
            :alt="props.stack.what.id"
            :src="keyImageUrl"
        >
        <el-text class="absolute pos-bottom-2px pos-right-2px" size="small">
            {{ formatNumber(props.stack.amount) }}
        </el-text>
        <el-text v-if="props.craftable" class="absolute pos-top-0px pos-left-2px">
            +
        </el-text>
    </div>
    <ItemTooltip
        v-if="displayName"
        v-show="showTooltip"
        :tooltips="tooltips"
        :style="tooltipStyle"
        :text="displayName"
    />
</template>

<style scoped>
.stack-container:hover {
    background-color: var(--app-mestack-color);
}
</style>