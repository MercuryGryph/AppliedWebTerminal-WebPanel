<script setup lang="ts">

import type Component from "~/core/data/minecraft/Component";

import {vsprintf} from "sprintf-js"
import {computed, ref} from "vue";
import {fetchTranslation} from "~/core/JsonTextUtils";
import {useConfig} from "~/data/Config";

const props = withDefaults(
    defineProps<{
        component: Component,
        minecraftFont?: boolean,
    }>(),
    {
        minecraftFont: false,
    }
)

const config = useConfig()


const classes = computed<string>(() => {
    let result: string = ""
    if (props.minecraftFont) {
        result += "minecraft-font "
    }
    return result
})

const style = computed<string>(() => {
    let result: string = ""
    const c = props.component
    if (c.bold) {
        result += "font-weight: bold;\n"
    }

    if (c.italic) {
        result += "font-style: italic;\n"
    }

    if (c.underline && c.strikethrough) {
        result += "text-decoration: underline line-through;\n"
    } else if (c.underline) {
        result += "text-decoration: underline;\n"
    } else if (c.strikethrough) {
        result += "text-decoration: line-through;\n"
    }

    if (c.color) {
        let color;
        switch (c.color) {
            case "black":
                color = "#000000"
                break;
            case "dark_blue":
                color = "#0000aa"
                break;
            case "dark_green":
                color = "#00aa00"
                break;
            case "dark_aqua":
                color = "#00aaaa"
                break;
            case "dark_red":
                color = "#aa0000"
                break;
            case "dark_purple":
                color = "#aa00aa"
                break;
            case "gold":
                color = "#ffaa00"
                break;
            case "gray":
                color = "#aaaaaa"
                break;
            case "dark_gray":
                color = "#555555"
                break;
            case "blue":
                color = "#5555ff"
                break;
            case "green":
                color = "#55ff55"
                break;
            case "aqua":
                color = "#55ffff"
                break;
            case "red":
                color = "#ff5555"
                break;
            case "light_purple":
                color = "#ff55ff"
                break;
            case "yellow":
                color = "#ffff55"
                break;
            case "white":
                color = "#ffffff"
                break;
            default:
                color = c.color
                break;
        }
        result += `color: ${color}\n`
    }
    return result
})

const translatedString = ref<string | undefined>(undefined)
const translatedLang = ref<string | undefined>(undefined)

const text = computed<string>(() => {
    const rawText = props.component.text
    const translateKey = props.component.translate
    const lang = config.localConfig.language

    if (translateKey && translatedLang.value !== lang) {

        // eslint-disable-next-line vue/no-async-in-computed-properties
        fetchTranslation(translateKey, lang).then((data) => {
            // Logger.debug(`Get translate of ${translateKey} in lang ${lang}: ${data}`)
            translatedString.value = data
            translatedLang.value = lang
        })
    }

    const actualText = rawText || translatedString.value || translateKey as string

    // Logger.debug(`Chosen: '${actualText}' , from: ['${translatedString.value}', ' ${translateKey}', '${rawText}']`)

    try {
        if (props.component.with) {
            return vsprintf(actualText, props.component.with)
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
    <span>
        <span :style="style" :class="classes">
            {{ text }}
        </span>
        <span v-if="props.component.extra">
            <ComponentView
                v-for="(c, i) in props.component.extra"
                :key="i"
                :component="c"
            />
        </span>
    </span>
</template>
