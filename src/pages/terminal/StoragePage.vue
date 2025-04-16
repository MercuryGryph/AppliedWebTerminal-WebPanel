<script setup lang="ts">
import type {TerminalSort} from "~/core/AeUtils";
import type MEStack from "~/core/data/ae/core/MEStack";

import {ref} from "vue"
import {fetchAeStoragePaged} from "~/core/AeUtils";
import {useAppStorage} from "~/data/AppStorage";
import PageMeta from "~/core/data/PageMeta";
import Logger from "~/utils/Logger";

const appStorage = useAppStorage()

const STACK_PER_PAGE = 9*3

const sort = ref<TerminalSort>('BY_NAME')
const stacks = ref<Array<MEStack>>([])

const loadedPage = ref<number>(0)
const pageMeta = ref<PageMeta | undefined>(undefined)
const isLoading = ref<boolean>(false);

function loadMore() {
    // if (pageMeta.value !== undefined) {
    //     if (loadedPage.value > pageMeta.value.totalPages) {
    //         Logger.info(`refused to load more because loadedPage(${loadedPage.value}) > pageMeta(${pageMeta.value.totalPages})`)
    //         return;
    //     }
    // }
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

</script>

<template>
    Storage
    <div
        v-infinite-scroll="loadMore"
        class="max-h-50vh flex flex-wrap of-visible"
    >
        <MEStackComponent
            v-for="stack in stacks"
            :key="stack.what.id"
            :stack="stack"
        />
    </div>
</template>
