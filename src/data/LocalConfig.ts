interface LocalConfig {
    language: string
    customLanguages: string[]
}

export default LocalConfig;

export function defaultLocalConfigValue(): LocalConfig {
    return {
        language: "en_us",
        customLanguages: []
    }
}
