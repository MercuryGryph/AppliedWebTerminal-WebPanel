<script setup lang="ts">

import {ref, watch} from "vue";
import {stringOf} from "~/core/I18nService";
import {fetchTranslation} from "~/core/JsonTextUtils";
import {useAppStorage} from "~/data/AppStorage";
import {useConfig} from "~/data/Config";
import Logger from "~/utils/Logger";


const model = defineModel<boolean>()

const config = useConfig()
const appStorage = useAppStorage()

const selectedLanguage = ref<string>(config.localConfig.language)

function setLanguage(): void {
    config.localConfig.language = selectedLanguage.value
    model.value = false
}

const showDialogAddLanguage = ref<boolean>(false);

const languageToAdd = ref<string>('')

const keyToTest = ref<string>('block.minecraft.grass_block')
const testResult = ref<string>('')

function test() {
    testResult.value = '(waiting for response...)'
    fetchTranslation(
        keyToTest.value,
        languageToAdd.value,
    ).then((result) => {
        testResult.value = result
    })
}

watch(keyToTest, ()=>{
    testResult.value = ''
})

function addLanguage(): void {
    config.localConfig = appStorage.localConfigStoreManager.get()
    const lang = languageToAdd.value
    Logger.info(`trying to add language ${lang}`)
    if (/^(?=\s*$)/.test(lang)) {
        Logger.info(`language '${lang}' is empty string`)
        return
    }
    if (!config.localConfig.customLanguages) {
        config.localConfig.customLanguages = []
    }
    if (!config.localConfig.customLanguages.includes(lang)) {
        config.localConfig.customLanguages.push(lang)
    } else {
        Logger.info(`language ${lang} is already in list`)
        Logger.info(config.localConfig.customLanguages)
    }
    appStorage.localConfigStoreManager.set(config.localConfig)
    showDialogAddLanguage.value = false
}

function removeLanguage(
    lang: string,
): void {
    config.localConfig = appStorage.localConfigStoreManager.get()
    Logger.info(`trying to remove language ${lang}`)
    if (selectedLanguage.value === lang) {
        selectedLanguage.value = 'en_us'
    }
    if (config.localConfig.language === lang) {
        config.localConfig.language = 'en_us'
    }
    if (!config.localConfig.customLanguages) {
        config.localConfig.customLanguages = []
    }
    if (!config.localConfig.customLanguages.includes(lang)) {
        Logger.info(`did not find language to remove in list: ${lang}`)
        Logger.info(config.localConfig.customLanguages)
        return
    }
    config.localConfig.customLanguages =
        config.localConfig.customLanguages.filter((it)=>{
            Logger.info(`remove language: ${lang}`)
            return it !== lang
        })
    appStorage.localConfigStoreManager.set(config.localConfig)
}

</script>

<template>
    <el-dialog
        v-model="model"
        width="210px"
        :title="stringOf('language.selector.title')"
    >
        <el-radio-group v-model="selectedLanguage" class="max-h-60vh w-full flex-col items-stretch">
            <el-radio value="zh_cn" class="grow ps-4 m-0!">
                zh_cn
            </el-radio>
            <el-radio value="en_us" class="border_color_el grow b-t b-t-solid ps-4 m-0!">
                en_us
            </el-radio>
            <div
                v-for="lang in config.localConfig.customLanguages"
                :key="lang"
                class="border_color_el h-48px flex grow justify-between b-t b-t-solid ps-4 m-0!"
            >
                <el-radio
                    :value="lang"
                    class="my-a w-full"
                >
                    {{ lang }}
                </el-radio>
                <el-button circle class="my-a" @click="()=>{removeLanguage(lang)}">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </el-button>
            </div>
        </el-radio-group>

        <div class="mt-2 flex">
            <el-button class="w-86px" @click="()=>{showDialogAddLanguage = true}">
                {{ stringOf('language.selector.button.add') }}
            </el-button>
            <el-button type="primary" class="w-86px" @click="setLanguage">
                {{ stringOf('common.button.confirm') }}
            </el-button>
        </div>
    </el-dialog>

    <el-dialog
        v-model="showDialogAddLanguage"
        width="300px"
        :title="stringOf('language.add.title')"
    >
        <el-input v-model="languageToAdd" :placeholder="stringOf('language.add.placeholder.lang')" />

        <el-divider content-position="left">
            <el-text type="info" size="small">
                {{ stringOf('language.add.label.test') }}
            </el-text>
        </el-divider>
        <div class="flex justify-between gap-2">
            <el-input v-model="keyToTest" :placeholder="stringOf('language.add.placeholder.test_key')" />
            <el-button type="info" @click="test">
                {{ stringOf('language.add.button.test') }}
            </el-button>
        </div>
        <el-input v-model="testResult" :placeholder="stringOf('language.add.placeholder.result')" disabled class="mt-2" />

        <template #footer>
            <el-row justify="space-evenly">
                <el-button
                    class="w-86px"
                    @click="()=>{ languageToAdd = ''; showDialogAddLanguage = false }"
                >
                    {{ stringOf('common.button.cancel') }}
                </el-button>
                <el-button
                    type="primary"
                    class="w-86px"
                    @click="addLanguage"
                >
                    {{ stringOf('language.add.button.add') }}
                </el-button>
            </el-row>
        </template>
    </el-dialog>
</template>
