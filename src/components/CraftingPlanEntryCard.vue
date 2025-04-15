<script setup lang="ts">
import type CraftingPlanSummaryEntry from "~/core/data/ae/craft/plan/CraftingPlanSummaryEntry";
import type jsonText from "~/core/data/minecraft/JsonText";

import {computed, ref} from "vue";
import {stringOf} from "~/core/I18nService";
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

function onMouseMove(e: MouseEvent) {
    mousePosition.value = {
        x: e.x,
        y: e.y
    }
}

const tooltipStyle = computed<string>(() => {
    return `position: absolute; left: ${mousePosition.value.x - 10}px; top: ${mousePosition.value.y - 10}px;`
})

const tooltips: string[] = new Array<string>()
if (props.entry.missingAmount) {
    tooltips.push(`${stringOf('ae.crafting.statue.missing')} ${props.entry.missingAmount}`)
}
if (props.entry.storedAmount) {
    tooltips.push(`${stringOf('ae.crafting.statue.available')} ${props.entry.storedAmount}`)
}
if (props.entry.craftAmount) {
    tooltips.push(`${stringOf('ae.crafting.statue.to_craft')} ${props.entry.craftAmount}`)
}
</script>

<template>
    <el-card
        :class="classed"
        class="w-200px"
        @mouseover="showTooltip = true"
        @mouseleave="showTooltip = false"
        @mousemove="onMouseMove"
    >
        <div class="h-58px flex flex-wrap justify-end text-right">
            <div class="mx-a my-a grow">
                <el-text
                    v-if="props.entry.missingAmount"
                    size="small"
                    class="my-1 block"
                >
                    {{ stringOf('ae.crafting.statue.missing') }} {{ props.entry.missingAmount }}
                </el-text>
                <el-text
                    v-if="props.entry.storedAmount"
                    size="small"
                    class="my-1 block"
                >
                    {{ stringOf('ae.crafting.statue.available') }} {{ props.entry.storedAmount }}
                </el-text>
                <el-text
                    v-if="props.entry.craftAmount"
                    size="small"
                    class="my-1 block"
                >
                    {{ stringOf('ae.crafting.statue.crafting') }} {{ props.entry.craftAmount }}
                </el-text>
            </div>
            <!-- height: 32px -->
            <span class="material-symbols-outlined my-a ml-20px block font-size-8">
                deployed_code
            </span>
        </div>
    </el-card>
    <ItemTooltip
        v-if="displayName && showTooltip"
        :tooltips="tooltips"
        :style="tooltipStyle"
        :text="displayName"
        @mousemove="onMouseMove"
    />
</template>