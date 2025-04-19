<script setup lang="ts">

import {MECraftingServiceStatusBundle, MECraftingStatusBundle} from "~/core/data/ae/MECraftingStatusBundle";
import type {Consumer, Subscriber} from "~/core/Subscriber";
import type MECpuStatusBundle from "~/core/data/ae/cpu/MECpuStatusBundle";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {Expand, Fold} from "@element-plus/icons-vue";
import {createSelectCpuCommand} from "~/core/data/ae/command/Commands";

const props = defineProps<{
    sender: Consumer<any>,
    messageSubscriber: Subscriber<MECraftingServiceStatusBundle>
}>()



const isCollapsed = ref(false)
const isMobile = ref(false)
const showMobileSidebar = ref(false)
const asideWidth = computed(() => {
    return isCollapsed.value ? '32px' : '200px'
})

const cpus = ref<MECpuStatusBundle[]>([])
const craftingStatus = ref<MECraftingStatusBundle | undefined>(undefined)

const selectedCpu = ref<number | undefined>(undefined)

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
    selectedCpu.value = cpuId
    props.sender(createSelectCpuCommand(cpuId))
}

props.messageSubscriber.subscribe(s => {
    cpus.value = s.cpus
    const status = s.craftingStatus
    if (status) {
        if (status.fullStatus) {
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
                craftingStatus.value = oldStatus
            }
        }
    } else {
        craftingStatus.value = undefined
    }
})

onMounted(() => {
    checkMobile()
    window.addEventListener("resize", checkMobile)
})

onUnmounted(() => {
    window.removeEventListener("resize", checkMobile)
})
</script>

<template>
    <div class="pt-4 h-85vh">
        <div
            v-if="showMobileSidebar"
            class="mobile-mask"
            @click="closeMobileSidebar"
        ></div>
        <el-container class="relative">
            <el-aside
                class="relative p-t-32px sidebar-wrapper"
                :width="asideWidth"
                :class="{
                    'collapsed': isCollapsed,
                    'mobile-show': showMobileSidebar
                }"
            >
                <el-menu v-for="cpu in cpus">
                    <CpuSelectionCard
                        class="cpu-selection-card my-1"
                        v-show="!isCollapsed"
                        :status="cpu"
                        :style="cpu.id == selectedCpu ? 'background-color: var(--app-mestack-hover-color);' : ''"
                        @click="() => selectCpu(cpu.id)"
                    />
                </el-menu>
                <div class="absolute pos-top-0 pos-left-0" @click="toggleCollapse">
                    <el-tooltip
                        :content="isCollapsed ? '展开侧边栏' : '折叠侧边栏'"
                        placement="top"
                    >
                        <Expand v-if="isCollapsed" class="w-32px"/>
                        <Fold v-else class="w-32px"/>
                    </el-tooltip>
                </div>
            </el-aside>
            <el-container>
                <el-main>
                    <div class="flex flex-col h-full">
                        <el-text size="large">合成状态</el-text>
                        <div class="grow flex overflow-y-scroll">
                            <CraftingStatusEntryCard
                                v-for="entry in craftingStatus?.entries"
                                :key="entry.serial"
                                :entry="entry"
                            />
                        </div>
                        <el-button>Cancel</el-button>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.sidebar-wrapper {
    background-color: #304156;
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