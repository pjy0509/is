export function $emptySlot<T>(x: ArrayLike<T>): boolean {
    const length = x.length;

    return Array.from({length: length}, (_, i) => i in x).includes(false);
}