<script setup lang="ts">

import type {MECraftingServiceStatusBundle} from "~/core/data/ae/MECraftingStatusBundle";
import type {Consumer, Subscriber} from "~/core/Subscriber";
import type MECpuStatusBundle from "~/core/data/ae/cpu/MECpuStatusBundle";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {Expand, Fold} from "@element-plus/icons-vue";

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

onMounted(() => {
    checkMobile()
    window.addEventListener("resize", checkMobile)
    props.messageSubscriber.subscribe(s => {
        cpus.value = s.cpus
    })
})

onUnmounted(() => {
    window.removeEventListener("resize", checkMobile)
})

const cpuStatus3: MECpuStatusBundle = {
    busy: true,
    coProcessorCount: 2048,
    craftingStatus: {
        crafting: {
            amount: 1000,
            what: {
                displayName: "{\"translate\":\"block.ae2.256k_crafting_storage\"}",
                id: "ae2:256k_crafting_storage",
                type: "ae2:i"
            },
            craftable: true
        },
        totalItems: 2147483647,
        progress: 10717740,
        elapsedTimeNanos: 1919810000
    },
    id: 2,
    name: undefined,
    storageSize: 536608768
}


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
                    <CpuSelectionCard class="cpu-selection-card my-1" v-show="!isCollapsed" :status="cpu"/>
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
                    TEST
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