export function $group<T, K extends PropertyKey>(x: ArrayLike<T>, getKey: (item: T) => K): Record<K, T[]> {
    const result = Object.create(null);

    for (let i = 0; i < x.length; i++) {
        const item = x[i];
        const key = getKey(item);

        if (!result[key]) {
            result[key] = [item];
        } else {
            result[key].push(item);
        }
    }

    return result;
}