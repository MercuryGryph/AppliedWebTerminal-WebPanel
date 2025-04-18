import type JsonText from "~/core/data/minecraft/JsonText";
import type JsonTextString from "~/core/data/minecraft/JsonTextString";
import {useTranslateStore} from "~/data/TranslateStore";

export async function fetchTranslation(key: string, language: string): Promise<string> {
    const store = useTranslateStore()
    return store.getTranslation(language, key)
}

export function JsonTextFrom(str: JsonTextString): JsonText {
    return JSON.parse(str) as JsonText;
}