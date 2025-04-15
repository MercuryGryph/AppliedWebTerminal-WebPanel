<script setup lang="ts">
import {ref} from "vue";
import {isDark, toggleDark} from "~/composables/dark";
import {useAppStorage} from "~/data/AppStorage";
import {useConfig} from "~/data/Config";
const config = useConfig()
const appStorage = useAppStorage()

function pageBackToRoot(): void {
    appStorage.inTerminalPage = false
    appStorage.currentTerminal = undefined
}

const showDialogSelectLanguage = ref<boolean>(false);

</script>

<template>
    <DialogSelectLanguage v-model="showDialogSelectLanguage" />

    <el-row justify="space-between" class="border_color_el h-full w-full w-full b-b b-b-solid py-2">
        <el-row class="my-a h-full w-fit">
            <el-button
                v-if="appStorage.inTerminalPage"
                circle
                class="my-a ml-2"
                @click="pageBackToRoot"
            >
                <span class="material-symbols-outlined">
                    arrow_back
                </span>
            </el-button>

            <el-text type="primary" class="mx-2 my-a font-bold">
                {{ config.serverConfig.title }}
            </el-text>
            <el-divider direction="vertical" class="my-a h-6" />
        </el-row>

        <el-row>
            <el-button
                circle
                class="float-right my-a"
                @click="()=>{showDialogSelectLanguage = true}"
            >
                <span class="material-symbols-outlined">
                    language
                </span>
            </el-button>
            <el-button
                circle
                class="float-right my-a mr-2"
                @click="toggleDark"
            >
                <span v-if="isDark" class="material-symbols-outlined">
                    dark_mode
                </span>
                <span v-else class="material-symbols-outlined">
                    light_mode
                </span>
            </el-button>
        </el-row>
    </el-row>
</template>
