import {Constructor} from "../../../utils/types";

export function $converter(x: unknown, be: ArrayConstructor): Array<unknown>;
export function $converter(x: unknown, be: SetConstructor): Set<unknown>;
export function $converter(x: unknown, be: MapConstructor): Map<unknown, unknown>;
export function $converter<T>(x: unknown, be: Constructor<T>): T;
export function $converter(x: unknown, be: any): any {
    if (be === Array) {
        if (typeof x === "object" && x !== null && "length" in x) {
            return Array.from(x as any);
        }

        return [];
    }

    if (be === Set) {
        if (typeof x === "object" && x !== null && "length" in x) {
            return new Set(Array.from(x as any));
        }

        return new Set();
    }

    if (be === Map) {
        if (typeof x === "object" && x !== null) {
            const map = new Map();

            for (const [key, value] of Object.entries(x)) {
                map.set(key, value);
            }

            return map;
        }

        return new Map();
    }

    const container = new be() as object;

    for (const key of [...Object.keys(container), ...Object.getOwnPropertySymbols(container)]) {
        try {
            const descriptor = Object.getOwnPropertyDescriptor(container, key);

            if (descriptor) {
                Object.defineProperty(container, key, { ...descriptor, value: (x as any)[key] });
            }
        } catch {}
    }

    return container;
}