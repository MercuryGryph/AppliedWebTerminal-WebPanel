<script setup lang="ts">

import {ref} from "vue";
import {tr} from "~/core/I18nService";
import {useAppStorage} from "~/data/AppStorage";
import CraftingPage from "~/pages/terminal/CraftingPage.vue";
import StoragePage from "~/pages/terminal/StoragePage.vue";

const appStorage = useAppStorage()

enum Page {
    Storage, Crafting
}

const selectedPage = ref<Page|undefined>();

</script>

<template>
    <div class="terminal_page m-4 mx-a max-w-1000px min-w-300px w-80% font-bold">
        <el-card class="bg-transparent backdrop-blur-lg z-500">
            <el-row justify="space-between">
                <el-row>
                    <el-text size="large" type="primary">
                        {{ appStorage.currentTerminal!.name }}
                    </el-text>
                </el-row>

                <el-row class="float-right">
                    <el-button-group>
                        <el-button
                            :type="selectedPage === Page.Storage ? 'primary' : 'default'"
                            :disabled="selectedPage === Page.Storage"
                            @click="()=>{selectedPage = Page.Storage}"
                        >
                            {{ tr('terminal.button.storage_page') }}
                        </el-button>
                        <el-button
                            :type="selectedPage === Page.Crafting ? 'primary' : 'default'"
                            :disabled="selectedPage === Page.Crafting"
                            @click="()=>{selectedPage = Page.Crafting}"
                        >
                            {{ tr('terminal.button.crafting_page') }}
                        </el-button>
                    </el-button-group>
                </el-row>
            </el-row>
        </el-card>
        <div>
            <StoragePage v-if="selectedPage === Page.Storage" />
            <CraftingPage v-else-if="selectedPage === Page.Crafting" />
        </div>
    </div>
</template>

<style>
.terminal_page {
    .el-card__body {
        padding-top: 0;
        padding-bottom: 0;
        padding: 10px;
        overflow-y: visible;
    }
}
</style>
