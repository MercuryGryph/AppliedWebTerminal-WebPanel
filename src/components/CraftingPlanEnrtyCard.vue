<script setup lang="ts">
import type CraftingPlanSummaryEntry from "~/core/data/ae/craft/plan/CraftingPlanSummaryEntry";

const props = defineProps<{
    entry: CraftingPlanSummaryEntry
}>()
</script>

<template>
    <el-card>
        <el-col>
            <el-row>
                <el-text v-if="props.entry.missingAmount > 0">
                    缺失数量: {{ props.entry.missingAmount }}
                </el-text>
                <el-text v-if="props.entry.craftAmount > 0">
                    合成数量: {{ props.entry.craftAmount }}
                </el-text>
                <el-text v-if="props.entry.storedAmount > 0">
                    可用数量: {{ props.entry.storedAmount }}
                </el-text>
            </el-row>
            <el-row>
                <span class="material-symbols-outlined">
                    deployed_code
                </span>
            </el-row>
        </el-col>
    </el-card>
</template>

<style scoped>

</style>