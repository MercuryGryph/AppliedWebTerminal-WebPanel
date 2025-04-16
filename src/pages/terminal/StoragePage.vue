<script setup lang="ts">
import type {TerminalSort} from "~/core/AeUtils";
import type MEStack from "~/core/data/ae/core/MEStack";

import type PageMeta from "~/core/data/PageMeta";
import {onMounted, onUnmounted, ref} from "vue"
import {fetchAeStoragePaged} from "~/core/AeUtils";
import {useAppStorage} from "~/data/AppStorage";
import Logger from "~/utils/Logger";

const appStorage = useAppStorage()

const STACK_PER_PAGE = 15 * 5

const sort = ref<TerminalSort>('BY_NAME')
const stacks = ref<Array<MEStack>>([])

const loadedPage = ref<number>(0)
const pageMeta = ref<PageMeta | undefined>(undefined)
const isLoading = ref<boolean>(false);
const containerRef = ref<any>(null);

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

const scrollStyle = ref<string>('')

function onResize() {
    calcPadding()
}

function calcPadding() {
    if (containerRef.value) {
        const rect = containerRef.value.getBoundingClientRect() as DOMRect
        const lineElements = Math.floor(rect.width / 64)
        const padding = (rect.width - (lineElements * 64)) / 2
        scrollStyle.value = `padding-left: ${padding}px;`
    }
}

onMounted(() => {
    calcPadding()
    window.addEventListener("resize", onResize)
})

onUnmounted(() => {
    window.removeEventListener("resize", onResize)
})

</script>

<template>
    <div ref="containerRef">
        <div
            v-infinite-scroll="loadMore"
            :infinite-scroll-distance="50"
            class="max-h-80vh flex flex-wrap justify-start overflow-y-scroll"
            :style="scrollStyle"
        >
            <MEStackComponent
                v-for="stack in stacks"
                :key="stack.what.id"
                :stack="stack"
            />
        </div>
        <el-text v-if="isLoading" size="large">
            Loading...
        </el-text>
    </div>
</template>
