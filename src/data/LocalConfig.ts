import {StorageSorting, StorageSortingOrder} from "~/core/data/ae/StorageSortingOrder";

interface LocalConfig {
    language: string,
    refreshInterval: number
    customLanguages: string[],
    sortingOrder: StorageSortingOrder,
    storageSorting: StorageSorting
}

export default LocalConfig;

export function defaultLocalConfigValue(): LocalConfig {
    return {
        language: "en_us",
        refreshInterval: 20,
        customLanguages: [],
        sortingOrder: StorageSortingOrder.Ascending,
        storageSorting: StorageSorting.BY_NAME
    }
}
