import {StorageSorting} from "~/core/data/ae/StorageSorting";

interface LocalConfig {
    language: string,
    refreshInterval: number
    customLanguages: string[],
    sorting: StorageSorting
}

export default LocalConfig;

export function defaultLocalConfigValue(): LocalConfig {
    return {
        language: "en_us",
        refreshInterval: 20,
        customLanguages: [],
        sorting: StorageSorting.Ascending
    }
}
