<script setup lang="ts">
import type AeKeyObject from "~/core/data/ae/core/aekey/AeKeyObject";
import type CraftingPlanSummary from "~/core/data/ae/craft/plan/CraftingPlanSummary";
import {ElNotification} from "element-plus";
import {nextTick, onMounted, onUnmounted, ref} from "vue";
import {createCraftPlan, submitCraftingPlan} from "~/core/AeUtils";
import {useAppStorage} from "~/data/AppStorage";

const props = defineProps<{
    what: AeKeyObject
    amount: number
}>()

const appStorage = useAppStorage()


const model = defineModel<boolean>()
const summary = ref<CraftingPlanSummary | undefined>(undefined)

const containerRef = ref<any>(null)
const paddingStyle = ref<string>('')

function calcPadding() {
    if (containerRef.value) {
        const rect = containerRef.value.getBoundingClientRect() as DOMRect
        const lineElements = Math.floor(rect.width / 228)
        const padding = (rect.width - (lineElements * 228)) / 2
        paddingStyle.value = `padding-left: ${padding}px;`
    }
}

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
    nextTick(calcPadding)
    window.addEventListener("resize", calcPadding)
})

onUnmounted(() => {
    window.removeEventListener("resize", calcPadding)
})

function onSubmit() {
    if (summary.value) {
        submitCraftingPlan(summary.value.id, appStorage.token!).then((data) => {
            if (data) {
                if (data.success) {
                    ElNotification({
                        title: "Craft Plan Submit Successfully",
                        type: "success",
                    })
                } else {
                    ElNotification({
                        title: "Craft Plan Submit Failure",
                        message: `Craft Plan Submit failed by ${data.errorCode}`,
                        type: "error",
                    })
                }
            }
        })
        model.value = false
    }
}

</script>

<template>
    <el-dialog v-bind="$attrs" v-model="model" class="dialog_crafting_plan">
        <template #header>
            <el-text line-clamp="1" class="text-6">
                Crafting Plan {{ summary ? `- ${summary.usedBytes.toLocaleString()} Bytes Used` : "" }}
            </el-text>
        </template>
        <div ref="containerRef" class="content-container h-full w-full flex items-center justify-center">
            <div
                v-if="summary" class="max-h-90% w-full flex flex-wrap justify-start overflow-y-scroll"
                :style="paddingStyle"
            >
                <CraftingPlanEntryCard
                    v-for="entry in summary.entries"
                    :key="entry.what.type + entry.what.id"
                    :entry="entry"
                />
            </div>
            <p v-if="!summary" class="adaptive-text">
                Calculating Please Wait...
            </p>
        </div>
        <template #footer>
            <el-row justify="space-between" class="px-2">
                <el-button class="w-28" size="large" @click="model = false">
                    Cancel
                </el-button>
                <el-button type="primary" class="w-28" size="large" :disabled="!summary || summary.simulation" @click="onSubmit">
                    Start
                </el-button>
            </el-row>
        </template>
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
<style>
.dialog_crafting_plan {
    .el-dialog__body {
        height: 82% !important;
    }
}
</style>