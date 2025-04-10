export function $reduce<T, U>(array: T[], callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U {
    let index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
        initialValue = callbackfn(initialValue, array[index], index, array);
    }

    return initialValue;
}