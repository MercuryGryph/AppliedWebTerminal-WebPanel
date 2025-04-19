export enum StorageSorting {
    Ascending = "ascending",
    Descending = "descending"
}

export function sortingAsTranslationKey(sorting: StorageSorting): string {
    return sorting === StorageSorting.Ascending ? "settings.item.terminal.sorting.ascending" : "settings.item.terminal.sorting.descending"
}