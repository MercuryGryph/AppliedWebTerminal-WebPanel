export type SortOrder = 'asc' | 'desc';

export interface SortCondition<T> {
    key: keyof T;
    order: SortOrder;
}

export function sortByConditions<T>(array: T[], conditions: SortCondition<T>[]): T[] {
    return array.slice().sort((a, b) => {
        for (const { key, order } of conditions) {
            const aValue = a[key];
            const bValue = b[key];

            let comparison = 0;
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                comparison = aValue - bValue;
            } else {
                comparison = String(aValue).localeCompare(String(bValue));
            }

            if (comparison !== 0) {
                return order === 'asc' ? comparison : -comparison;
            }
        }
        return 0;
    });
}