<script setup lang="ts">

import type MECpuStatusBundle from "~/core/data/ae/cpu/MECpuStatusBundle";
import type {MECraftingServiceStatusBundle, MECraftingStatusBundle} from "~/core/data/ae/MECraftingStatusBundle";
import type {Consumer, Subscriber} from "~/core/Subscriber";
import {Expand, Fold} from "@element-plus/icons-vue";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {
    createCancelCpuJobCommand,
    createSelectCpuCommand,
    createSetUpdateIntervalCommand
} from "~/core/data/ae/command/Commands";
import {tr} from "~/core/I18nService";
import {useConfig} from "~/data/Config";

const props = defineProps<{
    sender: Consumer<any>,
    messageSubscriber: Subscriber<MECraftingServiceStatusBundle>
}>()

const config = useConfig()

const isCollapsed = ref(false)
const isMobile = ref(false)
const showMobileSidebar = ref(false)
const asideWidth = computed(() => {
    return isCollapsed.value ? '32px' : '213px'
})

const cpus = ref<MECpuStatusBundle[]>([])
const craftingStatus = ref<MECraftingStatusBundle | undefined>(undefined)

const selectedCpuId = ref<number | undefined>(undefined)

const checkMobile = () => {
    isMobile.value = document.body.clientWidth < 768
    if (isMobile.value) {
        isCollapsed.value = true
    } else {
        isMobile.value = false
    }
}

const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
}

const closeMobileSidebar = () => {
    showMobileSidebar.value = false
}

const selectCpu = (cpuId: number) => {
    selectedCpuId.value = cpuId
    props.sender(createSelectCpuCommand(cpuId))
}

const cancelSelectCpuJob = () => {
    if (selectedCpuId.value) {
        props.sender(createCancelCpuJobCommand(selectedCpuId.value))
    }
}
const selectedCpu = computed<MECpuStatusBundle | undefined>(() => {
    return cpus.value.find(cpu => cpu.id === selectedCpuId.value)
})

const isBusy = computed(() => {
    return selectedCpu.value?.busy
})

let lastBusy = false

const onReceiveWSMessage = (data: MECraftingServiceStatusBundle) => {
    if (isBusy.value && !lastBusy) {
        console.log(isBusy.value, lastBusy)
        console.log(selectedCpuId.value)
        if (selectedCpuId.value) {
            props.sender(createSelectCpuCommand(selectedCpuId.value))
        }
    }
    lastBusy = !!isBusy.value
    if (!cpus.value.length) {
        selectedCpuId.value = data.cpus.at(0)?.id
        if (selectedCpuId.value) {
            props.sender(createSelectCpuCommand(selectedCpuId.value))
        }
    }
    cpus.value = data.cpus
    const status = data.craftingStatus
    if (status) {
        if (status.fullStatus) {
            status.entries = status.entries.sort((a, b) => {
                const sumA = a.pendingAmount + a.activeAmount
                const sumB = b.pendingAmount + b.activeAmount

                return sumB - sumA || b.pendingAmount - a.pendingAmount || b.activeAmount - a.activeAmount || b.storedAmount - a.storedAmount
            })
            craftingStatus.value = status
        } else {
            const oldStatus = craftingStatus.value
            if (oldStatus) {
                oldStatus.startItemCount = status.startItemCount
                oldStatus.remainingItemCount = status.remainingItemCount
                oldStatus.elapsedTime = status.elapsedTime
                const entryMap = new Map(oldStatus.entries.map(entry => [entry.serial, entry]))
                for (const entry of status.entries) {
                    const oltEntry = entryMap.get(entry.serial)
                    if (oltEntry) {
                        oltEntry.pendingAmount = entry.pendingAmount
                        oltEntry.activeAmount = entry.activeAmount
                        oltEntry.storedAmount = entry.storedAmount
                    }
                }
                oldStatus.entries = oldStatus.entries.filter(
                    entry => !(entry.pendingAmount <= 0 && entry.activeAmount <= 0 && entry.storedAmount <= 0)
                )
                oldStatus.entries = oldStatus.entries.sort((a, b) => {
                    const sumA = a.pendingAmount + a.activeAmount
                    const sumB = b.pendingAmount + b.activeAmount

                    return sumB - sumA || b.pendingAmount - a.pendingAmount || b.activeAmount - a.activeAmount || b.storedAmount - a.storedAmount
                })
                craftingStatus.value = oldStatus
            }
        }
    } else if (!selectedCpu.value?.busy) {
        craftingStatus.value = undefined
    }
}

onMounted(() => {
    checkMobile()
    window.addEventListener("resize", checkMobile)
    props.messageSubscriber.subscribe(onReceiveWSMessage)
    props.sender(createSetUpdateIntervalCommand(config.localConfig.refreshInterval))
})

onUnmounted(() => {
    window.removeEventListener("resize", checkMobile)
    props.sender(createSelectCpuCommand(-1))
    props.messageSubscriber.remove(onReceiveWSMessage)
})
</script>

<template>
    <div class="h-85vh pt-4">
        <div
            v-if="showMobileSidebar"
            class="mobile-mask"
            @click="closeMobileSidebar"
        />
        <el-container>
            <el-aside
                class="sidebar-wrapper relative h-80vh p-t-32px"
                :width="asideWidth"
                :class="{
                    'collapsed': isCollapsed,
                    'mobile-show': showMobileSidebar
                }"
            >
                <div class="h-full flex flex-col overflow-y-scroll">
                    <CpuSelectionCard
                        v-for="cpu in cpus"
                        v-show="!isCollapsed"
                        :key="cpu.id"
                        class="cpu-selection-card m-1"
                        :status="cpu"
                        :style="cpu.id === selectedCpuId ? 'background-color: var(--app-mestack-hover-color);' : ''"
                        @click="() => selectCpu(cpu.id)"
                    />
                </div>
                <div class="absolute pos-left-0 pos-top-0" @click="toggleCollapse">
                    <el-tooltip
                        :content="isCollapsed ? tr('ae.crafting.sidebar.open') : tr('ae.crafting.sidebar.close')"
                        placement="top"
                    >
                        <Expand v-if="isCollapsed" class="w-32px"/>
                        <Fold v-else class="w-32px"/>
                    </el-tooltip>
                </div>
            </el-aside>
            <el-container>
                <el-main>
                    <div class="h-77vh max-h-77vh flex flex-col items-end">
                        <el-text size="large" class="m-b-2 font-size-16px">
                            {{ tr('terminal.button.crafting_page') }}
                        </el-text>
                        <div class="grow overflow-y-scroll">
                            <div class="flex flex-wrap items-start overflow-y-scroll">
                                <CraftingStatusEntryCard
                                    v-for="entry in craftingStatus?.entries"
                                    :key="entry.serial"
                                    :entry="entry"
                                />
                            </div>
                        </div>
                        <el-button class="px-8" size="large" :disabled="!isBusy" @click="cancelSelectCpuJob">
                            {{ tr('common.button.cancel') }}
                        </el-button>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.sidebar-wrapper {
    background-color: var(--app-crafting-sidebar-wapper-bg);
    transition: width 0.3s ease;
    overflow: visible;

    @media (min-width: 768px) {
        transform: translateX(0);
    }

    @media (max-width: 767px) {
        position: fixed;
        left: 8px;
        top: 148px;
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);

        &.mobile-show {
            transform: translateX(0);
        }
    }
}

.cpu-selection-card:hover {
    background-color: var(--app-mestack-hover-color);
}
</style>