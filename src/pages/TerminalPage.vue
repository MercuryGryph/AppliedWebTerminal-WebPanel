<script setup lang="ts">

import {ref} from "vue";
import {useAppStorage} from "~/data/AppStorage";

const appStorage = useAppStorage()

enum Page {
    Storage, Crafting
}

const selectedPage = ref<Page|undefined>();

</script>

<template>
    <el-card class="m-4 mx-a max-w-1000px min-w-300px w-80% font-bold">
        <template #header>
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
                            Storage
                        </el-button>
                        <el-button
                            :type="selectedPage === Page.Crafting ? 'primary' : 'default'"
                            :disabled="selectedPage === Page.Crafting"
                            @click="()=>{selectedPage = Page.Crafting}"
                        >
                            Crafting Status
                        </el-button>
                    </el-button-group>
                </el-row>
            </el-row>
        </template>
    </el-card>
</template>
