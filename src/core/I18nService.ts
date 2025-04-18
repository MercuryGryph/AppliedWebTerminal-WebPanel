import {sprintf, vsprintf} from "sprintf-js";
import {useConfig} from "~/data/Config";

const fetchedTranslate: Map<string, Map<string, string>> = new Map();

export function trLanguageName(
    language: string
) : string{
    const res = fetchedTranslate.get(language)?.get("lang.name")
    if (res !== undefined) {
        return res
    }
    return language
}

export function tr(
    key: string,
    ...args: any
): string {
    const config = useConfig()
    const res = fetchedTranslate.get(config.localConfig.language)?.get(key)
    if (res !== undefined) {
        return vsprintf(res, args)
    }
    return trDefault(key, args)
}

function trDefault(key: string, ...args: any): string {
    const res = fetchedTranslate.get('en_us')?.get(key)
    if (res !== undefined) {
        return vsprintf(res, args)
    }
    return key
}

export async function initTranslate() {
    const resp = await fetch(`/lang/all.json`)
    if (!resp.ok) return
    const list = await resp.json() as Array<string>
    for (let i = 0; i < list.length; i++) {
        const lang = list[i]
        const langResp = await fetch(`/lang/${lang}`)
        if (!langResp.ok) return
        const translate = new Map(Object.entries(await langResp.json())) as Map<string, string>
        fetchedTranslate.set(lang.replace('.json', ''), translate)
    }
}