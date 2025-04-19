<script setup lang="ts">
import {useAppStorage} from "~/data/AppStorage";
import {useConfig} from "~/data/Config";
import {tr} from "~/core/I18nService";
import {computed, ref} from "vue";
import {sortingAsTranslationKey, StorageSorting} from "~/core/data/ae/StorageSorting";

const display = defineModel<boolean>()

const config = useConfig()
const appStorage = useAppStorage()

const displayLanguage = ref(false)
const interval = ref(config.localConfig.refreshInterval)

const handleIntervalChanged = (value: number) => {
    config.localConfig.refreshInterval = Math.floor(value)
    interval.value = value
}

const acceptLanguage = () => {
    displayLanguage.value = true
}

const lang = computed(() => config.localConfig.language)
const sorting = ref(config.localConfig.sorting)
const options = [StorageSorting.Ascending, StorageSorting.Descending]

const onSortingChanged = (it: StorageSorting) => {
    sorting.value = it
    config.localConfig.sorting = it
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
            <el-divider content-position="left" class="font-size-16px">{{ tr("settings.item.terminal", lang) }}
            </el-divider>
            <div class="flex mt-2 justify-between items-center">
                {{ tr("settings.item.terminal.sorting", lang) }}
                <el-select
                    v-model="sorting"
                    @change="onSortingChanged"
                    class="w-150px"
                >
                    <el-option
                        v-for="item in options"
                        :key="item"
                        :label="tr(sortingAsTranslationKey(item))"
                        :value="item"
                    />
                </el-select>
            </div>
            <el-divider content-position="left">{{ tr("settings.item.status", lang) }}</el-divider>

            <div class="flex mt-2 justify-between items-center">
                <span class="font-size-13px">{{ tr("settings.item.terminal.refresh_interval", lang) }}</span>
                <el-input-number v-model="interval" :precision="0" :min="1" :max="100" @change="handleIntervalChanged"/>
            </div>

            <el-divider content-position="left">{{ tr("settings.item.language", lang) }}</el-divider>
            <el-button class="w-fit" @click="acceptLanguage">{{ tr("settings.item.language.configure", lang) }}
            </el-button>
        </div>

    </el-dialog>
</template>