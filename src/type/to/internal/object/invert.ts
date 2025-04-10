export function $invert<K extends PropertyKey, V extends PropertyKey>(x: Record<K, V>): Record<V, K> {
    const result = {} as Record<V, K>;

    for (const entry of Object.entries(x)) {
        result[entry[1] as V] = entry[0] as K;
    }

    return result;
}