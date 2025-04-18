<script setup lang="ts">

import MECpuStatusBundle from "~/core/data/ae/cpu/MECpuStatusBundle";
import {computed, ref} from "vue";
import {tr} from "~/core/I18nService";
import {JsonTextFrom} from "~/core/JsonTextUtils";
import JsonText from "~/core/data/minecraft/JsonText";
import {formatNumber} from "../core/NumberUtil";
import Logger from "~/utils/Logger";
import {useThrottleFn} from "@vueuse/core";

const props = defineProps<{
    status: MECpuStatusBundle,
    clicked?: (it: MECpuStatusBundle) => void
}>()
const clickEventWrapper = () => props.clicked ? props.clicked(props.status) : undefined

const name = computed(() => {
    return props.status.name ? JsonTextFrom(props.status.name!) : {
        text: tr("ae.crafting.cpu", props.status.id)
    }
})

const url = computed(() => {
    return props.status.busy ? `/aeResource/${props.status.craftingStatus!.crafting.what.type}/${props.status.craftingStatus!.crafting.what.id}` : undefined
})

console.log(name.value)

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

const tooltips = computed(() => {
    const result = new Array<string>()
    return result
})

</script>

<template>
    <el-card @click="clickEventWrapper" class="h-23 w-50 flex flex-col justify-end h-full">
        <JsonTextSpan v-if="props.status.name" :json-text="name as JsonText"/>
        <el-text v-else>{{ name }}</el-text>
        <div class="mt-3">
            <div v-if="!props.status.busy" class="flex" style="align-items: center">
                <span class="material-symbols-outlined">memory</span>
                <span class="h-100%">{{ formatNumber(props.status.storageSize) }}</span>
                <span class="material-symbols-outlined ms-3">fast_forward</span>
                <span class="h-100%">{{ formatNumber(props.status.coProcessorCount) }}</span>
            </div>
            <div v-else class="flex ms-0.5" style="align-items: center">
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