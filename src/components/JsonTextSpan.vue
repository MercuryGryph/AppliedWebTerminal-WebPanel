<script setup lang="ts">

import type JsonText from "~/core/data/minecraft/JsonText";

import {vsprintf} from "sprintf-js"
import {computed, ref} from "vue";
import {fetchTranslation} from "~/core/JsonTextUtils";
import Logger from "~/utils/Logger";
import {useConfig} from "~/data/Config";

const props = withDefaults(
    defineProps<{
        jsonText: JsonText,
        minecraftFont: boolean,
    }>(),
    {
        minecraftFont: false,
    }
)

const classes = computed<string>(() => {
    let result: string = ""
    if (props.minecraftFont) {
        result += "minecraft-font "
    }
    return result
})

const style = computed<string>(() => {
    let result: string = ""
    const jsonText = props.jsonText

    if (jsonText.bold) {
        result += "font-weight: bold;\n"
    }

    if (jsonText.italic) {
        result += "font-style: italic;\n"
    }

    if (jsonText.underline && jsonText.strikethrough) {
        result += "text-decoration: underline line-through;\n"
    } else if (jsonText.underline) {
        result += "text-decoration: underline;\n"
    } else if (jsonText.strikethrough) {
        result += "text-decoration: line-through;\n"
    }

    if (jsonText.color) {
        result += `color: ${jsonText.color}\n`
    }
    return result
})

const translatedString = ref<string | undefined>(undefined)

const text = computed<string>(() => {
    const rawText = props.jsonText.text
    const translateKey = props.jsonText.translate

    if (translateKey && !translatedString.value) {
        const config = useConfig()
        const lang = config.localConfig.language

        // eslint-disable-next-line vue/no-async-in-computed-properties
        fetchTranslation(translateKey, lang).then((data) => {
            Logger.debug(`Get translate of ${translateKey}: ${data}`)
            translatedString.value = data
        })
    }

    const actualText: string = translatedString.value || translateKey || rawText

    Logger.debug(`Chosen: '${actualText}' , from: ['${translatedString.value}', ' ${translateKey}', '${rawText}']`)

    try {
        if (props.jsonText.with) {
            return vsprintf(actualText, props.jsonText.with)
        } else {
            return actualText
        }
        // eslint-disable-next-line unused-imports/no-unused-vars
    } catch (_) {
    }
    return actualText
})

</script>

<template>
    <span :style="style" :class="classes">
        {{ text }}
    </span>

    <!--  <div v-for="char in chars">-->
    <!--    <span :class="styleClasses">-->
    <!--      {{ char }}-->
    <!--    </span>-->
    <!--  </div>-->
</template>
