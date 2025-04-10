export function $entries<T>(x: ArrayLike<T>): [string, T][] {
    const result: [string, T][] = [];

    for (const key of Object.keys(x)) {
        result.push([key, x[key as any]]);
    }

    return result;
}