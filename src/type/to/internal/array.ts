import {ToArray, Truthy} from "../../utils/types";
import is from "../../is/index";
import to from "../index";

export type ArrayConverter = {
    <T>(x: T): ToArray<T>;

    compact<T>(x: readonly T[]): Truthy<T>[];

    chunk<T>(x: readonly T[], size: number): T[][];

    drop<T>(x: readonly T[], until: ((value: T, index: number, arr: readonly T[]) => boolean) | number): T[];

    dropLast<T>(x: readonly T[], until: ((value: T, index: number, arr: readonly T[]) => boolean) | number): T[];

    take<T>(x: readonly T[], until: ((value: T, index: number, arr: readonly T[]) => boolean) | number): T[];

    takeLast<T>(x: readonly T[], until: ((value: T, index: number, arr: readonly T[]) => boolean) | number): T[];

    shuffle<T>(x: readonly T[]): T[];

    flat<T, D extends number>(x: readonly T[], depth?: D): FlatArray<T[], D>[];

    groupBy<T, K extends PropertyKey>(x: readonly T[], getKey: (item: T) => K): Record<K, T[]>;

    at<T>(x: ArrayLike<T>): undefined;

    at<T>(x: ArrayLike<T>, n: number): T | undefined;

    at<T>(x: ArrayLike<T>, ...n: number[]): (T | undefined)[];

    union<T>(lhs: readonly T[], rhs: readonly T[], predicate?: (lhs: T, rhs: T) => boolean): T[];

    different<T>(lhs: readonly T[], rhs: readonly T[], predicate?: (lhs: T, rhs: T) => boolean): T[];

    intersection<T>(lhs: readonly T[], rhs: readonly T[], predicate?: (lhs: T, rhs: T) => boolean): T[];
}

export const $array: ArrayConverter = Object.assign(
    function $array<T>(x: T): ToArray<T> {
        return (is.array.like(x) ? Array.prototype.slice.call(to.object.values(x)) : [x]) as ToArray<T>;
    },
    {
        compact: function $compact<T>(x: readonly T[]): Truthy<T>[] {
            const arr: T[] = to.object.values(x);
            const result: Truthy<T>[] = [];

            for (let i: number = 0; i < arr.length; i++) {
                const item: T = arr[i];

                if (item) {
                    result.push(item as Truthy<T>);
                }
            }

            return result;
        },

        chunk: function $chunk<T>(x: readonly T[], size: number): T[][] {
            const arr: T[] = to.object.values(x);
            const length: number = Math.ceil(x.length / size);
            const result: T[][] = Array(length);

            for (let i: number = 0; i < length; i++) {
                const st: number = i * size;
                const ed: number = st + size;

                result[i] = arr.slice(st, ed);
            }

            return result;
        },

        drop: function $drop<T>(x: readonly T[], until: ((value: T, index: number, arr: readonly T[]) => boolean) | number): T[] {
            const arr: T[] = to.object.values(x);

            if (is.number(until)) {
                return arr.slice(Math.max(until, 0));
            }

            const index: number = arr.findIndex(to.function.negate(until));

            if (index === -1) {
                return [];
            }

            return arr.slice(index);
        },

        dropLast: function $dropLast<T>(x: readonly T[], until: ((value: T, index: number, arr: readonly T[]) => boolean) | number): T[] {
            const arr: T[] = to.object.values(x);

            if (is.number(until)) {
                return arr.slice(0, Math.min(-until, 0));
            }

            for (let i: number = arr.length - 1; i >= 0; i--) {
                if (!until(arr[i], i, arr)) {
                    return arr.slice(0, i + 1);
                }
            }

            return [];
        },

        take: function $take<T>(x: readonly T[], until: ((value: T, index: number, arr: readonly T[]) => boolean) | number): T[] {
            const arr: T[] = to.object.values(x);

            if (is.number(until)) {
                return arr.slice(0, Math.max(until, 0));
            }

            for (let i: number = 0; i <= arr.length; i++) {
                if (!until(arr[i], i, arr)) {
                    return arr.slice(0, i);
                }
            }

            return arr;
        },

        takeLast: function $takeLast<T>(x: readonly T[], until: ((value: T, index: number, arr: readonly T[]) => boolean) | number): T[] {
            const arr: T[] = to.object.values(x);

            if (is.number(until)) {
                if (until <= 0) {
                    return [];
                }

                return arr.slice(-until);
            }

            for (let i: number = arr.length - 1; i >= 0; i--) {
                if (!until(arr[i], i, arr)) {
                    return arr.slice(i + 1);
                }
            }

            return arr;
        },

        shuffle: function $shuffle<T>(x: readonly T[]): T[] {
            const result: T[] = to.object.values(x);
            let i: number = result.length;
            let j: number;

            while (i) {
                j = Math.random() * i-- | 0;
                [result[i], result[j]] = [result[j], result[i]];
            }

            return result;
        },

        flat: function $flat<T, D extends number>(x: readonly T[], depth: D = Infinity as D): FlatArray<T[], D>[] {
            if (depth < 0) {
                return [to.array.flat(x, depth + 1 as D)] as FlatArray<T[], D>[];
            }

            if (depth === 0) {
                return to.object.values(x) as FlatArray<T[], D>[];
            }

            const arr: T[] = to.object.values(x);
            const result: FlatArray<T[], D>[] = [];
            const flooredDepth: number = Math.floor(depth);

            const recursive = (arr: readonly T[], currentDepth: number): void => {
                for (let i: number = 0; i < arr.length; i++) {
                    const item: T = arr[i];

                    if (Array.isArray(item) && currentDepth < flooredDepth) {
                        recursive(item, currentDepth + 1);
                    } else {
                        result.push(item as FlatArray<T[], D>);
                    }
                }
            };

            recursive(arr, 0);

            return result;
        },

        groupBy<T, K extends PropertyKey>(x: readonly T[], getKey: (item: T) => K): Record<K, T[]> {
            const arr: T[] = to.object.values(x);
            const result: Record<K, T[]> = Object.create(null) as Record<K, T[]>;

            for (let i: number = 0; i < arr.length; i++) {
                const item: T = arr[i];
                const key: K = getKey(item);

                if (!result[key]) {
                    result[key] = [item];
                } else {
                    result[key].push(item);
                }
            }

            return result;
        },

        at: function $at<T>(x: ArrayLike<T>, ...n: number[]): any {
            const arr: T[] = to.object.values(x);

            if (n.length === 0) {
                return undefined;
            } else if (n.length === 1) {
                if (n[0] < 0) {
                    return arr[n[0] + arr.length];
                } else {
                    return arr[n[0]];
                }
            } else {
                const length: number = arr.length;
                const result: (T | undefined)[] = new Array<T | undefined>(n.length);

                for (let i: number = 0; i < n.length; i++) {
                    let index: number = n[i];

                    if (index < 0) {
                        index += length;
                    }

                    result[i] = arr[index];
                }

                return result;
            }
        },

        union: function $union<T>(lhs: readonly T[], rhs: readonly T[], predicate?: (lhs: T, rhs: T) => boolean): T[] {
            return lhs.slice();
        },

        different: function $different<T>(lhs: readonly T[], rhs: readonly T[], predicate?: (lhs: T, rhs: T) => boolean): T[] {
            lhs = to.object.values(lhs);
            rhs = to.object.values(rhs);

            if (predicate) {
                return lhs.filter((e: T): boolean => rhs.every((f: T): boolean => !predicate(e, f)));
            }

            const set: Set<T> = new Set(rhs);

            return lhs.filter((e: T): boolean => !set.has(e));
        },

        intersection: function $intersection<T>(lhs: readonly T[], rhs: readonly T[], predicate?: (lhs: T, rhs: T) => boolean): T[] {
            return lhs.slice();
        },
    }
)