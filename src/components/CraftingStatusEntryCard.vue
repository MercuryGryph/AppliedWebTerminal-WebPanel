<script setup lang="ts">
import type MECraftingStatusEntry from "~/core/data/ae/cpu/crafting/MECraftingStatusEntry";

import {useThrottleFn} from "@vueuse/core";
import {computed, ref} from "vue";
import Component from "~/core/data/minecraft/Component";
import {tr} from "~/core/I18nService";
import {formatNumber} from "~/core/NumberUtil";
import Logger from "~/utils/Logger";

const props = defineProps<{
    entry: MECraftingStatusEntry
}>()

const classed = computed<string>(() => {
    const entry = props.entry
    if (entry.activeAmount !== 0) {
        return 'card_bg_crafting'
    }
    if (entry.pendingAmount !== 0) {
        return 'card_bg_pending'
    }
    return ""
})

const displayName = computed<Component | undefined>(() => {
    const raw = props.entry.what!.displayName
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
    const result = new Array<Component>()
    if (props.entry.storedAmount) {
        result.push(Component.literal(tr('ae.crafting.status.stored', formatNumber(props.entry.storedAmount))))
    }
    if (props.entry.activeAmount) {
        result.push(Component.literal(tr('ae.crafting.status.active', formatNumber(props.entry.activeAmount))))
    }
    if (props.entry.pendingAmount) {
        result.push(Component.literal(tr('ae.crafting.status.pending', formatNumber(props.entry.pendingAmount))))
    }
    return result
})


const keyImageUrl = computed(() => {
    return `/aeResource/${props.entry.what!.type}/${props.entry.what!.id}`
})
</script>

<template>
    <el-card
        ref="hoverElement"
        class="relative m-1 h-100px max-w-220px min-w-220px"
        :class="classed"
        v-bind="$attrs"
        @mousemove="onMouseMove"
        @mouseleave="()=>{showTooltip = false}"
    >
        <div class="h-58px flex flex-wrap justify-end text-right">
            <div class="mx-a my-a grow">
                <el-text
                    v-if="props.entry.storedAmount"
                    size="small"
                    class="my-1 block"
                >
                    {{ tr('ae.crafting.status.stored', formatNumber(props.entry.storedAmount)) }}
                </el-text>
                <el-text
                    v-if="props.entry.activeAmount"
                    size="small"
                    class="my-1 block"
                >
                    {{ tr('ae.crafting.status.active', formatNumber(props.entry.activeAmount)) }}
                </el-text>
                <el-text
                    v-if="props.entry.pendingAmount"
                    size="small"
                    class="my-1 block"
                >
                    {{ tr('ae.crafting.status.pending', formatNumber(props.entry.pendingAmount)) }}
                </el-text>
            </div>
            <img
                class="my-a ml-1 block h-50px w-50px font-size-8"
                :alt="props.entry.what!.id"
                :src="keyImageUrl"
            >
        </div>
        <Teleport to=".terminal_page">
            <ItemTooltip
                v-if="displayName"
                v-show="showTooltip"
                class="z-10000"
                :tooltips="tooltips"
                :style="tooltipStyle"
                :text="displayName"
            />
        </Teleport>
    </el-card>
</template>