import {getEnumerableProperties} from "../../../utils/function/getEnumerableProperties";

export function $clone<T>(x: T, ref: Map<any, any> = new Map()): T {
    if (x == null || (typeof x !== "object" && typeof x !== "function")) {
        return x;
    }

    if (ref.has(x)) {
        return ref.get(x);
    }

    if (x instanceof Date) {
        return new Date(x.getTime()) as T;
    }

    try {
        if (x instanceof Buffer) {
            return x.subarray() as T;
        }
    } catch {
    }

    if (x instanceof ArrayBuffer) {
        return x.slice(0) as T;
    }

    try {
        if (x instanceof SharedArrayBuffer) {
            return x.slice(0) as T;
        }
    } catch {
    }

    if (x instanceof RegExp) {
        const regExp = new RegExp(x.source, x.flags);

        regExp.lastIndex = x.lastIndex;

        return regExp as T;
    }

    if (Array.isArray(x)) {
        const array = new Array(x.length);

        ref.set(x, array);

        for (let i = 0; i < x.length; i++) {
            array[i] = $clone(x[i], ref);
        }

        if ("index" in x) {
            (array as RegExpMatchArray).index = x.index as number | undefined;
        }

        return array as T;
    }

    if (x instanceof Map) {
        const map = new Map();

        ref.set(x, map);

        for (const [key, value] of x) {
            map.set(key, $clone(value, ref));
        }

        return map as T;
    }

    if (x instanceof Set) {
        const set = new Set();

        ref.set(x, set);

        for (const value of x) {
            set.add($clone(value, ref));
        }

        return set as T;
    }

    if (ArrayBuffer.isView(x) && !(x instanceof DataView)) {
        const typedArray = new (Object.getPrototypeOf(x).constructor)((x as any).length);

        ref.set(x, typedArray);

        for (let i = 0; i < (x as any).length; i++) {
            typedArray[i] = $clone((x as any)[i], ref);
        }

        return typedArray;
    }

    try {
        if (x instanceof DataView) {
            const dataView = new DataView(x.buffer.slice(0), x.byteOffset, x.byteLength);

            ref.set(x, dataView);

            copyProperties(x, dataView, ref);

            return dataView as T;
        }
    } catch {
    }

    if (x instanceof File) {
        const file = new File([x], x.name, {type: x.type});

        ref.set(x, file);

        copyProperties(x, file, ref);

        return file as T;
    }

    if (x instanceof Blob) {
        const blob = new Blob([x], {type: x.type});

        ref.set(x, blob);

        copyProperties(x, blob, ref);

        return blob as T;
    }

    if (x instanceof Error || x instanceof DOMException) {
        const error = new (x.constructor as { new(): Error })();

        ref.set(x, error);

        error.message = x.message;
        error.name = x.name;
        error.stack = x.stack;

        if ("cause" in x) {
            error.cause = x.cause;
        }

        copyProperties(x, error, ref);

        return error as T;
    }

    if (x instanceof Number || x instanceof String || x instanceof Boolean) {
        return Object(x.valueOf()) as T;
    }

    const constructor = "constructor" in x ? (x as any).constructor : null;

    if (typeof constructor === "function" && constructor !== Object) {
        try {
            Reflect.construct(String, [], constructor);

            const descriptor = Object.getOwnPropertyDescriptor(constructor, "prototype");

            if (!(!descriptor || descriptor.writable)) {
                const container = new constructor() as object;

                for (const key of [...Object.keys(container), ...Object.getOwnPropertySymbols(container)]) {
                    try {
                        const descriptor = Object.getOwnPropertyDescriptor(container, key);

                        if (descriptor) {
                            Object.defineProperty(container, key, { ...descriptor, value: (x as any)[key] });
                        }
                    } catch {}
                }

                return container as T;
            }
        } catch (e) {
        }
    }

    if (typeof x === "object") {
        const object = {};

        ref.set(x, object);

        copyProperties(x, object, ref);

        return object as T;
    }

    return x;
}

function copyProperties(lhs: any, rhs: any, stack?: Map<any, any>): void {
    const keys = getEnumerableProperties(lhs);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const descriptor = Object.getOwnPropertyDescriptor(rhs, key);

        if (descriptor === undefined || descriptor.writable) {
            rhs[key] = $clone(lhs[key], stack);
        }
    }
}