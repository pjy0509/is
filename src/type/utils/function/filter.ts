export function $filter<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T[] {
    let index = -1,
        length =  array.length,
        resIndex = 0,
        result = [];

    while (++index < length) {
        const value = array[index];

        if (predicate(value, index, array)) {
            result[resIndex++] = value;
        }
    }

    return result;
}