import {$map} from "../../../utils/function/map";
import {DeepOmit, Keys} from "../../../utils/types";

export function $omit<T extends object, K extends Keys<T>>(x: T, ...key: K[]): DeepOmit<T, K>;
export function $omit<T extends object>(x: T, ...key: string[]): object;
export function $omit<T extends object>(x: T, ...keys: readonly string[]): object {
    return omitDeep(x, keys.map(path => path.split('.')));
}

export function omitDeep(x: any, paths: string[][]): any {
    if (x === null || typeof x !== 'object') {
        return x;
    }

    if (Array.isArray(x)) {
        return $map(x, element => omitDeep(element, paths));
    }

    const omitted = new Set<string>();
    const next: Record<string, string[][]> = {};

    for (const path of paths) {
        if (path.length === 0) continue;

        const [firstKey, ...rest] = path;

        if (rest.length === 0) {
            omitted.add(firstKey);
        } else {
            if (!next[firstKey]) {
                next[firstKey] = [];
            }

            next[firstKey].push(rest);
        }
    }

    const obj: any = Array.isArray(x) ? [] : {};

    for (const key in x) {
        if (!Object.prototype.hasOwnProperty.call(x, key) || omitted.has(key)) {
            continue;
        }

        if (next[key]) {
            obj[key] = omitDeep(x[key], next[key]);
        } else {
            obj[key] = omitDeep(x[key], []);
        }
    }

    return obj;
}