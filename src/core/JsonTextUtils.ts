import type {UnwrapRef} from "vue";
import type JsonText from "~/core/data/minecraft/JsonText";
import type JsonTextString from "~/core/data/minecraft/JsonTextString";
import type LocalConfig from "~/data/LocalConfig";

export async function fetchTranslatedText(
    key: string,
    language: string,
    localConfig: UnwrapRef<LocalConfig>): Promise<string | undefined> {
    if (localConfig.translateCache.has(language)) {
        localConfig.translateCache.set(language, new Map())
    }
    if (localConfig.translateCache.get(language)!.has(key)) {
        return localConfig.translateCache.get(language)!.get(key)
    }
    const response = await fetch(`/translate/${language}/${key}`)
    if (response.ok) {
        const result = await response.text()
        localConfig.translateCache.get(language)!.set(key, result)
        return result
    }
}

export function JsonTextFrom(str: JsonTextString): JsonText {
    return JSON.parse(str) as JsonText;
}
