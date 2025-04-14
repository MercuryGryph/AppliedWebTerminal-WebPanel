<script setup lang="ts">
import type CraftingPlanSummaryEntry from "~/core/data/ae/craft/plan/CraftingPlanSummaryEntry";
import {computed} from "vue";

const props = defineProps<{
    entry: CraftingPlanSummaryEntry
}>()

const classed = computed<string>(()=>{
    let res:string = ''
    if (props.entry.missingAmount) {
        res += 'card'
    }
    return res
})

</script>

<template>
    <el-card class="w-200px" :class="classed">
        <div class="h-50px flex flex-wrap justify-end text-align-right">
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
            <span class="material-symbols-outlined my-a block font-size-8 pl-14px">
                deployed_code
            </span>
        </div>
    </el-card>
</template>

<style scoped>
html.dark {
    .card {
        background-color: #993c3c;
    }
}
html:not(.dark) {
    .card {
        background-color: #fba0a0;
    }
}
</style>
