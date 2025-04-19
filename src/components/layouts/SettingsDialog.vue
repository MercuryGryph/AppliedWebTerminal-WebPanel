<script setup lang="ts">
import {computed, ref} from "vue";
import {tr} from "~/core/I18nService";
import {useConfig} from "~/data/Config";
import Logger from "~/utils/Logger";
import {clamp} from "~/utils/utils";

const display = defineModel<boolean>()

const config = useConfig()

const displayLanguage = ref(false)
const interval = ref(config.localConfig.refreshInterval)

const handleIntervalChanged = (value: number) => {
    config.localConfig.refreshInterval = value
}

const acceptLanguage = () => {
    displayLanguage.value = true
}

const lang = computed(() => config.localConfig.language)

const dialogWidth = computed<number>(() => {
    const width = document.documentElement.clientWidth

    const min = 300
    const max = 500
    const relativeFactor = 0.6

    const res = clamp(relativeFactor * width, min, max)
    Logger.debug(`dialog width: ${res}`)
    return res
})
</script>

<template>
    <DialogSelectLanguage v-model="displayLanguage"/>
    <el-dialog
        v-model="display"
        :title="tr('settings.title', config.localConfig.language)"
        :width="dialogWidth"
    >
        <div class="flex flex-col">
            <el-divider content-position="left" class="font-size-16px">
                {{ tr("settings.item.terminal", lang) }}
            </el-divider>
            排序.png
            <el-divider content-position="left">
                {{ tr("settings.item.status", lang) }}
            </el-divider>

            <div class="mt-2 flex justify-between" style="align-items: center">
                <span class="font-size-13px">{{ tr("settings.item.terminal.refresh_interval", lang) }}</span>
                <el-input-number v-model="interval" :min="1" :max="100" @change="handleIntervalChanged"/>
            </div>

            <el-divider content-position="left">
                {{ tr("settings.item.language", lang) }}
            </el-divider>
            <el-button class="w-fit" @click="acceptLanguage">
                {{ tr("settings.item.language.configure", lang) }}
            </el-button>
        </div>
    </el-dialog>
</template>