<script setup lang="ts">
import type {TerminalSort} from "~/core/AeUtils";
import type AeKeyObject from "~/core/data/ae/core/aekey/AeKeyObject";

import type MEStack from "~/core/data/ae/core/MEStack";
import type PageMeta from "~/core/data/PageMeta";
import {Search} from "@element-plus/icons-vue";
import {useDebounceFn} from "@vueuse/core";
import {nextTick, onMounted, onUnmounted, ref} from "vue"
import {fetchAeStoragePaged} from "~/core/AeUtils";
import {tr} from "~/core/I18nService";
import {useAppStorage} from "~/data/AppStorage";
import {useConfig} from "~/data/Config";
import Logger from "~/utils/Logger";

const appStorage = useAppStorage()
const config = useConfig()

const STACK_PER_PAGE = 15 * 5

const sort = ref<TerminalSort>('BY_NAME')
const decrease = ref(false)

const showStorage = ref(true)

const stacks = ref<Array<MEStack>>([])
const loadedPage = ref<number>(0)
const pageMeta = ref<PageMeta | undefined>(undefined)
const isLoading = ref<boolean>(false);

const containerRef = ref<any>(null);
const scrollContainer = ref<any>(null);

const search = ref("")

const showAmountSelect = ref(false);
const showCraftPlan = ref(false)
const requestKey = ref<AeKeyObject | undefined>(undefined)
const requestAmount = ref(0)

function loadMore() {
    if (pageMeta.value !== undefined) {
        if (loadedPage.value > pageMeta.value.totalPages) {
            Logger.info(`refused to load more because loadedPage(${loadedPage.value}) > pageMeta(${pageMeta.value.totalPages})`)
            return;
        }
    }
    if (isLoading.value) {
        return;
    }
    Logger.info(`load more store: page(${loadedPage.value})`)
    isLoading.value = true;
    fetchAeStoragePaged(
        loadedPage.value,
        STACK_PER_PAGE,
        sort.value,
        decrease.value,
        search.value,
        config.localConfig.language,
        appStorage.token!,
    ).then((data) => {
        if (data) {
            stacks.value.push(...data.data)
            pageMeta.value = data.meta
            loadedPage.value += 1
        }
        isLoading.value = false
    })
}

loadMore()

const paddingStyle = ref<string>('')

function calcPadding() {
    if (containerRef.value) {
        const rect = containerRef.value.getBoundingClientRect() as DOMRect
        const lineElements = Math.floor(rect.width / 64)
        const padding = (rect.width - (lineElements * 64)) / 2
        paddingStyle.value = `padding-left: ${padding}px;`
    }
}

onMounted(() => {
    nextTick(calcPadding)
    window.addEventListener("resize", calcPadding)
})

onUnmounted(() => {
    window.removeEventListener("resize", calcPadding)
})

function refreshStorage() {
    loadedPage.value = 0
    pageMeta.value = undefined
    stacks.value = []
    isLoading.value = false

    showStorage.value = false
    nextTick(() => {
        showStorage.value = true
        loadMore()
    })
}

const debounceRefreshStorage = useDebounceFn(refreshStorage, 500, {rejectOnCancel: true})

function onInput(_value: any) {
    debounceRefreshStorage().catch(() => {
    })
}

function onStackClick(stack: MEStack) {
    if (stack.craftable) {
        requestKey.value = stack.what
        requestAmount.value = 0
        showAmountSelect.value = true
    }
}

function onSelectClick() {
    if (requestAmount.value <= 0) return
    showAmountSelect.value = false
    showCraftPlan.value = true
}

</script>

<template>
    <CraftingPlanSummaryComponent
        v-if="showCraftPlan"
        v-model="showCraftPlan"
        :what="requestKey!"
        :amount="requestAmount"
        class="h-80% w-80%"
    />
    <el-dialog v-if="showAmountSelect" v-model="showAmountSelect" align-center>
        <template #header>
            <el-text>
                {{ tr("ae.crafting.plan.select_amount") }}
            </el-text>
        </template>
        <el-row class="justify-between">
            <MEStackComponent :stack="{what: requestKey!, amount: 0, craftable: false}"/>
            <el-input v-model.number="requestAmount" type="number" class="w-80 px-4 font-size-8" :min="0" @keyup.enter="onSelectClick"/>
            <el-button class="h-64px w-30 font-size-8" size="large" :disabled="!requestAmount" @click="onSelectClick">
                {{ tr("ae.crafting.plan.next") }}
            </el-button>
        </el-row>
    </el-dialog>
    <div ref="containerRef" v-bind="$attrs">
        <el-input
            v-model="search"
            class="my-2"
            clearable
            :prefix-icon="Search"
            :placeholder="tr('terminal.input.search')"
            @keyup.enter="refreshStorage"
            @input="onInput"
        />
        <div
            v-if="showStorage"
            ref="scrollContainer"
            v-infinite-scroll="loadMore"
            :infinite-scroll-distance="50"
            :infinite-scroll-disabled="isLoading"
            class="max-h-80vh flex flex-wrap justify-start overflow-y-scroll"
            :style="paddingStyle"
        >
            <MEStackComponent
                v-for="stack in stacks"
                :key="stack.what.type + stack.what.id"
                :stack="stack"
                @click="() => onStackClick(stack)"
            />
        </div>
        <el-text v-if="isLoading" size="large">
            Loading...
        </el-text>
    </div>
</template>
