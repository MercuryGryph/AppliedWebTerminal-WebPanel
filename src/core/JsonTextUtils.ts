import type Component from "~/core/data/minecraft/Component";
import {useTranslateStore} from "~/data/TranslateStore";

export async function fetchTranslation(key: string, language: string): Promise<string> {
    const store = useTranslateStore()
    return store.getTranslation(language, key)
}

export function decodeComponent(str: string): Component {
    return JSON.parse(str) as Component;
}