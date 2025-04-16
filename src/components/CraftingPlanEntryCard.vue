<script setup lang="ts">
import type CraftingPlanSummaryEntry from "~/core/data/ae/craft/plan/CraftingPlanSummaryEntry";
import type jsonText from "~/core/data/minecraft/JsonText";

import {useThrottleFn} from "@vueuse/core";
import {computed, ref} from "vue";
import {tr} from "~/core/I18nService";
import {formatNumber} from "~/core/NumberUtil";
import Logger from "~/utils/Logger";

const props = defineProps<{
    entry: CraftingPlanSummaryEntry
}>()

const classed = computed<string>(() => {
    let res: string = ''
    if (props.entry.missingAmount) {
        res += 'card_bg_warn'
    }
    return res
})

const displayName = computed<jsonText | undefined>(() => {
    const raw = props.entry.what.displayName
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
    const result = new Array<string>()
    if (props.entry.missingAmount) {
        result.push(`${tr('ae.crafting.statue.missing')}${formatNumber(props.entry.missingAmount)}`)
    }
    if (props.entry.storedAmount) {
        result.push(`${tr('ae.crafting.statue.available')}${formatNumber(props.entry.storedAmount)}`)
    }
    if (props.entry.craftAmount) {
        result.push(`${tr('ae.crafting.statue.to_craft')}${formatNumber(props.entry.craftAmount)}`)
    }
    return result
})


const keyImageUrl = computed(() => {
    return `/aeResource/${props.entry.what.type}/${props.entry.what.id}`
})
</script>

<template>
    <el-card
        ref="hoverElement"
        :class="classed"
        class="relative m-2 max-w-220px min-w-220px"
        @mousemove="onMouseMove"
        @mouseleave="()=>{showTooltip = false}"
    >
        <div class="h-58px flex flex-wrap justify-end text-right">
            <div class="mx-a my-a grow">
                <el-text
                    v-if="props.entry.missingAmount"
                    size="small"
                    class="my-1 block"
                >
                    {{ tr('ae.crafting.statue.missing') }}{{ formatNumber(props.entry.missingAmount) }}
                </el-text>
                <el-text
                    v-if="props.entry.storedAmount"
                    size="small"
                    class="my-1 block"
                >
                    {{ tr('ae.crafting.statue.available') }}{{ formatNumber(props.entry.storedAmount) }}
                </el-text>
                <el-text
                    v-if="props.entry.craftAmount"
                    size="small"
                    class="my-1 block"
                >
                    {{ tr('ae.crafting.statue.to_craft') }}{{ formatNumber(props.entry.craftAmount) }}
                </el-text>
            </div>
            <img
                class="my-a ml-1 block h-50px w-50px font-size-8"
                :alt="props.entry.what.id"
                :src="keyImageUrl"
            >
        </div>
    </el-card>
    <ItemTooltip
        v-if="displayName"
        v-show="showTooltip"
        class="z-10000"
        :tooltips="tooltips"
        :style="tooltipStyle"
        :text="displayName"
    />
</template>