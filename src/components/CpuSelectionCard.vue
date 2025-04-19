<script setup lang="ts">

import type MECpuStatusBundle from "~/core/data/ae/cpu/MECpuStatusBundle";
import Component from "~/core/data/minecraft/Component";
import {useThrottleFn} from "@vueuse/core";
import {sprintf, vsprintf} from "sprintf-js";
import {computed, ref, watch} from "vue";
import {tr} from "~/core/I18nService";
import {fetchTranslation, decodeComponent} from "~/core/JsonTextUtils";
import {formatNumber} from "~/core/NumberUtil";
import {useConfig} from "~/data/Config";

const props = defineProps<{
    status: MECpuStatusBundle,
    clicked?: (it: MECpuStatusBundle) => void
}>()
const clickEventWrapper = () => props.clicked ? props.clicked(props.status) : undefined
const config = useConfig()

const name = computed(() => {
    return props.status.name ? decodeComponent(props.status.name!) : Component.literal(tr("ae.crafting.cpu", props.status.id))
})

const url = computed(() => {
    return props.status.busy ? `/aeResource/${props.status.craftingStatus!.crafting.what.type}/${props.status.craftingStatus!.crafting.what.id}` : undefined
})

const itemNameText = ref<string>("")
const showTooltip = ref(false)
const mousePosition = ref({
    x: 0,
    y: 0
})

const hoverElement = ref<any>(null)

const onMouseMove = useThrottleFn((e: MouseEvent) => {
    const {pageX, pageY} = e
    if (hoverElement.value) {
        const rect = hoverElement.value.$el.getBoundingClientRect()
        showTooltip.value = (
            pageX >= rect.left && pageX <= rect.right &&
            pageY >= rect.top && pageY <= rect.bottom
        );
    }
    mousePosition.value = {
        x: pageX,
        y: pageY
    }
}, 100)

const tooltipStyle = computed<string>(() => {
    return `position: fixed; left: ${mousePosition.value.x + 10}px; top: ${mousePosition.value.y + 10}px;`
})

const getVisualOrderText = (text: Component) => {
    if (text.translate) {
        fetchTranslation(text.translate, config.localConfig.language)
            .then(it => {
                if (text.with) {
                    itemNameText.value = vsprintf(it, text.with)
                    return
                }
                itemNameText.value = it
            })
    }
    itemNameText.value = text.text!
}
watch(props, _it => {
    getVisualOrderText(decodeComponent(props.status.craftingStatus!.crafting.what.displayName))
}, {
    deep: true
})

if (props.status.craftingStatus) {
    console.log(props.status.craftingStatus)
    getVisualOrderText(decodeComponent(props.status.craftingStatus!.crafting.what.displayName))
}

const formatNanoseconds = (ns: number) => {
    const hours = Math.floor(ns / (3600 * 1e9));
    const remainingNsAfterHours = ns % (3600 * 1e9);
    const minutes = Math.floor(remainingNsAfterHours / (60 * 1e9));
    const remainingNsAfterMinutes = remainingNsAfterHours % (60 * 1e9);
    const seconds = Math.floor(remainingNsAfterMinutes / 1e9);
    let result = '';
    if (hours > 0) {
        result += `${hours}h`;
    }
    if (minutes > 0) {
        result += `${minutes}m`;
    }
    if (seconds > 0) {
        result += `${seconds}s`;
    }
    return result.trim();
}

const precentColor = computed(() => {
    if (props.status.craftingStatus) {
        let p = props.status.craftingStatus.progress / props.status.craftingStatus.totalItems
        const r = Math.floor(255.0 * Math.max(0.0, Math.min(2.0 - 2.0 * p, 1.0)));
        const g = Math.floor(255.0 * Math.max(0.0, Math.min(2.0 * p, 1.0)));
        const rgb = (r << 16) + (g << 8);
        return sprintf("#%06X", rgb)
    }
    return ""
})

console.log(precentColor.value)

const numberComponent = (it: number) => {
    return Component.literal(formatNumber(it)).withColor("#886eff")
}

const tooltips = computed(() => {
    const result = new Array<Component>()
    result.push(
        numberComponent(props.status.storageSize)
            .append(Component.literal(tr("ae.cpu.storage")))
    )
    result.push(
        numberComponent(props.status.coProcessorCount)
            .append(Component.literal(tr("ae.cpu.coprocessors")))
    )

    if (props.status.craftingStatus) {
        result.push(Component.literal(tr("ae.cpu.crafting"))
            .append(numberComponent(props.status.craftingStatus!.crafting.amount))
            .append(Component.literal(` ${itemNameText.value}`))
        )
        let progress = ((props.status.craftingStatus!.progress / props.status.craftingStatus.totalItems) * 100.0)
            .toFixed(2)
        let time = formatNanoseconds(props.status.craftingStatus.elapsedTimeNanos)
        result.push(Component.literal(tr("ae.cpu.crafting_progress"))
            .append(Component.literal(`${progress}%`).withColor(precentColor.value))
            .append(Component.literal(tr("ae.cpu.crafting_progress.in")))
            .append(Component.literal(time).withColor("#886eff"))
        )
        return result
    }
    return result
})

const onMouseLeave = () => {
    showTooltip.value = false
}

</script>

<template>
    <el-card
        ref="hoverElement" class="h-23 h-full w-50 flex flex-col justify-end" @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
        @click="clickEventWrapper"
    >
        <ComponentView :component="name"/>
        <div class="mt-3">
            <div v-if="!props.status.busy" class="flex" style="align-items: center">
                <span class="material-symbols-outlined">memory</span>
                <span class="h-100%">{{ formatNumber(props.status.storageSize) }}</span>
                <span class="material-symbols-outlined ms-3">fast_forward</span>
                <span class="h-100%">{{ formatNumber(props.status.coProcessorCount) }}</span>
            </div>
            <div v-else class="ms-0.5 flex" style="align-items: center">
                <span class="material-symbols-outlined me-3">rocket_launch</span>
                <span class="h-100%">{{ props.status.craftingStatus!.crafting.amount }}</span>
                <img :alt="props.status.craftingStatus!.crafting.what.id" class="ms-1 h-32px w-32px" :src="url">
            </div>
        </div>
        <ItemTooltip
            v-show="showTooltip"
            class="z-10000"
            :tooltips="tooltips"
            :style="tooltipStyle"
            :text="name"
        />
    </el-card>
</template>