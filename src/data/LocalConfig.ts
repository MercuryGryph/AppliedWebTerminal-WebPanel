interface LocalConfig {
    language: string,
    refreshInterval: number
    customLanguages: string[]
}

export default LocalConfig;

export function defaultLocalConfigValue(): LocalConfig {
    return {
        language: "en_us",
        refreshInterval: 20,
        customLanguages: []
    }
}
