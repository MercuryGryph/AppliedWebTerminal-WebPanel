<script setup lang="ts">
import {ref} from "vue";
import {isDark, toggleDark} from "~/composables/dark";
import {useAppStorage} from "~/data/AppStorage";
import {useConfig} from "~/data/Config";

const config = useConfig()
const appStorage = useAppStorage()

const selectedLanguage = ref<string>(config.localConfig.language)

function pageBackToRoot(): void {
    appStorage.inTerminalPage = false
    appStorage.currentTerminal = undefined
}

</script>

<template>
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
            <el-popconfirm
                width="210px"
                hide-icon
            >
                <template #reference>
                    <el-button
                        circle
                        class="float-right my-a"
                    >
                        <span class="material-symbols-outlined">
                            language
                        </span>
                    </el-button>
                </template>
                <template #actions>
                    <div class="w-full text-start">
                        <el-radio-group v-model="selectedLanguage" class="flex-col">
                            <el-radio value="zh_cn" class="grow">
                                zh_cn
                            </el-radio>
                            <el-radio value="en_us" class="border_color_el grow b-t b-t-solid">
                                en_us
                            </el-radio>
                        </el-radio-group>

                        <div class="flex">
                            <el-button>
                                Confirm
                            </el-button>
                            <el-button>
                                Confirm
                            </el-button>
                        </div>
                    </div>
                </template>
            </el-popconfirm>
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
