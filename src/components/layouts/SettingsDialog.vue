<script setup lang="ts">
import {useAppStorage} from "~/data/AppStorage";
import {useConfig} from "~/data/Config";
import {tr} from "~/core/I18nService";
import {ref} from "vue";

const display = defineModel<boolean>()

const config = useConfig()
const appStorage = useAppStorage()

const displayLanguage = ref(false)
const interval = ref(config.localConfig.refreshInterval)

const handleIntervalChanged = (value: number) => {
    config.localConfig.refreshInterval = value
}

const acceptLanguage = () => {
    displayLanguage.value = true
}

</script>

<template>
    <DialogSelectLanguage v-model="displayLanguage"/>
    <el-dialog
        v-model="display"
        :title='tr("settings.title", config.localConfig.language)'
        class="w-100"
    >
        <div class="flex flex-col">
            <el-divider content-position="left" class="font-size-16px">Terminal</el-divider>
            排序.png
            <el-divider content-position="left">Status</el-divider>

            <div class="flex mt-2 justify-between" style="align-items: center">
                <span class="font-size-13px">Refresh Interval</span>
                <el-input-number v-model="interval" :min="1" :max="100" @change="handleIntervalChanged"/>
            </div>

            <el-divider content-position="left">Language</el-divider>
            <el-button class="w-fit" @click="acceptLanguage">Configure</el-button>
        </div>

    </el-dialog>
</template>