interface LocalConfig {
    language: string;
    translateCache: Map<string, Map<string, string>>
}

export default LocalConfig;

export function defaultLocalConfigValue(): LocalConfig {
    return {
        language: "en_us",
        translateCache: new Map()
    }
}
