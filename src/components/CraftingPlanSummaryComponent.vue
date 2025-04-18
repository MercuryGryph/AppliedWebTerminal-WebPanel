<script setup lang="ts">
import AeKeyObject from "~/core/data/ae/core/aekey/AeKeyObject";
import {onMounted, ref} from "vue";
import CraftingPlanSummary from "~/core/data/ae/craft/plan/CraftingPlanSummary";
import {createCraftPlan} from "~/core/AeUtils";
import {useAppStorage} from "~/data/AppStorage";

const appStorage = useAppStorage()

const model = defineModel()
const props = defineProps<{
    what: AeKeyObject
    amount: number
}>()

const summary = ref<CraftingPlanSummary | undefined>(undefined)

onMounted(() => {
    createCraftPlan(
        props.what.type,
        props.what.id,
        props.amount,
        "REPORT_MISSING_ITEMS",
        appStorage.token!
    ).then((data) => {
        if (data) {
            summary.value = data
        }
    })
})

</script>

<template>
    <el-dialog v-bind="$attrs" v-model="model">
        <template #header>
            <el-text class="text-6">
                Crafting Plan {{ summary ? `- ${summary.usedBytes.toLocaleString()} Bytes Used` : "" }}
            </el-text>
        </template>
        <div class="flex flex-col h-70vh">
            <div class="flex items-center justify-center content-container h-full w-full">
                <div class="flex flex-wrap justify-start overflow-y-scroll max-h-90% w-full">
                    <CraftingPlanEntryCard
                        v-if="summary"
                        v-for="entry in summary.entries"
                        :key="entry.what.type + entry.what.id"
                        :entry="entry"
                    />
                </div>
                <p v-if="!summary" class="adaptive-text">
                    Calculating Please Wait...
                </p>
            </div>
            <el-row type="flex" justify="space-between">
                <el-button class="w-32" size="large" @click="model=false">
                    Cancel
                </el-button>
                <el-button class="w-32" size="large" :disabled="!summary || summary.simulation">
                    Start
                </el-button>
            </el-row>
        </div>
    </el-dialog>
</template>

<style scoped>
.content-container {
    flex: 1 1 auto;
    container-type: inline-size;
    width: 100%;
    margin: 0 auto;
}
.adaptive-text {
    will-change: font-size;
    font-size: clamp(14px, calc(0.5rem + 2cqw), 24px);
    transition: font-size 0.3s cubic-bezier(0.33, 1, 0.68, 1);
    @media (prefers-reduced-motion: reduce) {
        .adaptive-text {
            transition: none;
        }
    }
    line-height: clamp(1.3, 1cqw + 1.2, 1.6);
    word-break: break-word;
    hyphens: auto;
}

</style>