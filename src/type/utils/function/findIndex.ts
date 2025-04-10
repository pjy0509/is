export function $findIndex<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): number {
    let length = array.length,
        index = 0;

    while (++index < length) {
        if (predicate(array[index], index, array)) {
            return index;
        }
    }

    return -1;
}