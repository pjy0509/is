import {$converter} from "./converter";

export function $flat<T, D extends number>(x: ArrayLike<T>, depth: D = Infinity as D): FlatArray<T[], D>[] {
    if (depth < 0) {
        return [$flat(x, depth + 1 as D)] as FlatArray<T[], D>[];
    }

    if (depth === 0) {
        return x as FlatArray<T[], D>[];
    }

    const arr = $converter(x);
    const result: FlatArray<T[], D>[] = [];
    const flooredDepth = Math.floor(depth);

    const recursive = (arr: ArrayLike<T>, currentDepth: number) => {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];

            if (Array.isArray(item) && currentDepth < flooredDepth) {
                recursive(item, currentDepth + 1);
            } else {
                result.push(item as FlatArray<T[], D>);
            }
        }
    };

    recursive(arr, 0);

    return result;
}