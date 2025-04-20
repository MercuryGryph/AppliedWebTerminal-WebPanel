export enum StorageSortingOrder {
    Ascending = "ascending",
    Descending = "descending"
}

export enum StorageSorting {
    BY_NAME = "BY_NAME",
    BY_COUNT = "BY_COUNT",
    BY_MOD = "BY_MOD"
}

export function sortingOrderAsTranslationKey(sorting: StorageSortingOrder): string {
    return sorting === StorageSortingOrder.Ascending
        ? "settings.item.terminal.sorting.ascending"
        : "settings.item.terminal.sorting.descending"
}

export function sortingAsTranslationKey(sorting: StorageSorting): string {
    return "settings.item.terminal.sorting." + sorting.toLowerCase()
}