<script setup lang="ts">
import type CraftingPlanSummaryEntry from "~/core/data/ae/craft/plan/CraftingPlanSummaryEntry";
import type jsonText from "~/core/data/minecraft/JsonText";

import {computed} from "vue";
import Logger from "~/utils/Logger";

const props = defineProps<{
    entry: CraftingPlanSummaryEntry
}>()

const classed = computed<string>(()=>{
    let res:string = ''
    if (props.entry.missingAmount) {
        res += 'card_bg_warn'
    }
    return res
})

const displayName = computed<jsonText | undefined>(()=>{
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

</script>

<template>
    <el-card class="w-200px" :class="classed">
        <div class="border_color_el mx-a mb-2 h-28px b-b b-b-solid text-end">
            <el-text v-if="!displayName" size="small">
                {{ props.entry.what.displayName }}
            </el-text>
            <JsonTextSpan v-if="displayName" :json-text="displayName" />
        </div>

        <div class="h-58px flex flex-wrap justify-end text-right">
            <div class="mx-a my-a grow">
                <el-text
                    v-if="props.entry.missingAmount"
                    size="small"
                    class="my-1 block"
                >
                    缺失数量: {{ props.entry.missingAmount }}
                </el-text>
                <el-text
                    v-if="props.entry.craftAmount"
                    size="small"
                    class="my-1 block"
                >
                    合成数量: {{ props.entry.craftAmount }}
                </el-text>
                <el-text
                    v-if="props.entry.storedAmount"
                    size="small"
                    class="my-1 block"
                >
                    可用数量: {{ props.entry.storedAmount }}
                </el-text>
            </div>
            <!-- height: 32px -->
            <span class="material-symbols-outlined my-a ml-20px block font-size-8">
                deployed_code
            </span>
        </div>
    </el-card>
</template>
