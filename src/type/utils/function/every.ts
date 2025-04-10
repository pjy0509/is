export function $every<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): boolean {
    let index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
        if (!predicate(array[index], index, array)) {
            return false;
        }
    }
    return true;
}