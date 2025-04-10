import {getTag} from "../function/getTag";
import {$constructor} from "../../is/internal/is/constructor";
import {$like} from "../../is/internal/array/like";
import {$iterator} from "../../is/internal/is/iterator";
import {$argument} from "../../is/internal/is/arguments";
import {$string} from "../../to/internal/node/string";

export class MemoizationMap {
    static #hashCache = new Map();
    static #memoizationCache = new Map();
    static instance = new MemoizationMap();

    set(fn: (...args: any[]) => any, args: IArguments, returnValue: any, age?: number): void {
        const key = MemoizationMap.hashValue(args);

        let fnCache = MemoizationMap.#memoizationCache.get(fn);

        if (!fnCache) {
            fnCache = new Map<string, any>();
            MemoizationMap.#memoizationCache.set(fn, fnCache);
        }

        const cacheEntry = returnValue;

        if (age !== undefined) {
            setTimeout(() => MemoizationMap.#memoizationCache.get(fn)?.delete(key), age);
        }

        fnCache.set(key, cacheEntry);
    }

    get(fn: (...args: any[]) => any, args: IArguments): any {
        const fnCache = MemoizationMap.#memoizationCache.get(fn);

        if (!fnCache) {
            return undefined;
        }

        const key = MemoizationMap.hashValue(args);
        const cacheEntry = fnCache.get(key);

        if (!cacheEntry) {
            return undefined;
        }

        return cacheEntry;
    }

    has(fn: (...args: any[]) => any, args: IArguments): boolean {
        const fnCache = MemoizationMap.#memoizationCache.get(fn);

        if (!fnCache) {
            return false;
        }

        const key = MemoizationMap.hashValue(args);

        return fnCache.get(key);
    }

    delete(fn: (...args: any[]) => any): boolean {
        return MemoizationMap.#memoizationCache.delete(fn);
    }

    private static hashValue(value: any, tag: string = getTag(value)): string {
        const type = typeof value;

        if (value === null) {
            return tag + 'null';
        }

        if (value === undefined) {
            return tag + 'undefined';
        }

        if (type === "number" || type === "boolean") {
            return tag + value.toString();
        }

        if (type === "string") {
            return tag + '"' + value + '"';
        }

        if ($constructor(value)) {
            return value.prototype.toString() + value.toString();
        }

        if (Array.isArray(value)) {
            return MemoizationMap.hashArray(value, tag);
        }

        if ($like(value) || $argument(value) || $iterator(value)) {
            return MemoizationMap.hashValue(Array.from(value as any), tag);
        }

        if (value instanceof Set) {
            return MemoizationMap.hashSet(value, tag);
        }

        if (value instanceof Map) {
            return MemoizationMap.hashMap(value, tag);
        }

        if (value instanceof Node) {
            return MemoizationMap.hashElement(value);
        }

        if (type === "function") {
            return tag + value.toString();
        }

        if (type === "object") {
            return MemoizationMap.hashObject(value, tag);
        }

        return tag + value.toString();
    }

    private static hashArray(value: any[], tag: string = getTag(value)): string {
        let arrayHash = tag + '{';

        for (let i = 0; i < value.length; i++) {
            arrayHash += MemoizationMap.hashValue(value[i]) + ',';
        }

        return arrayHash + '}';
    }

    private static hashSet(value: Set<any>, tag: string = getTag(value)): string {
        if (MemoizationMap.#hashCache.has(value)) {
            return MemoizationMap.#hashCache.get(value)!;
        }

        let setArray = Array.from(value).map(element => MemoizationMap.hashValue(element, tag)).sort();
        let setHash = 'Set{' + setArray.join(',') + '}';

        MemoizationMap.#hashCache.set(value, setHash);

        return setHash;
    }

    private static hashMap(value: Map<any, any>, tag: string = getTag(value)): string {
        if (MemoizationMap.#hashCache.has(value)) {
            return MemoizationMap.#hashCache.get(value)!;
        }

        let mapArray = Array.from(value.entries()).map(([key, val]) => [MemoizationMap.hashValue(key, tag), MemoizationMap.hashValue(val, tag)]);

        mapArray.sort(([aKey], [bKey]) => aKey.localeCompare(bKey));

        let mapHash = 'Map{' + mapArray.map(([key, val]) => key + '=>' + val).join(',') + '}';

        MemoizationMap.#hashCache.set(value, mapHash);

        return mapHash;
    }

    private static hashObject<T extends object>(value: T, tag: string = getTag(value)): string {
        if (MemoizationMap.#hashCache.has(value)) {
            return MemoizationMap.#hashCache.get(value)!;
        }

        let keys = Object.keys(value).sort() as (keyof T)[];
        let objectHash = tag + value.toString() + value.constructor.toString() + '{';

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];

            objectHash += '"' + key.toString() + '":' + MemoizationMap.hashValue(value[key]) + ',';
        }

        objectHash += '}';
        MemoizationMap.#hashCache.set(value, objectHash);

        return objectHash;
    }

    private static hashElement(value: Node, tag: string = getTag(value)): any {
        return tag + $string(value);
    }
}