export function $map<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U): U[] {
    let index = -1,
        length = array.length,
        result = Array(length);

    while (++index < length) {
        result[index] = callbackfn(array[index], index, array);
    }

    return result;
}