import {observableSymbol, tags} from './constants';
import {DateUnit, FunctionObserverHandler, HTMLElementObserverHandler, ObjectObserverHandler, Observable} from "./types";
import {RefStack} from "./RefStack";
import {is} from "../is/core/is";
import to from "../to/index";

export function getTag(x: any): string {
    if (x === null) {
        return tags.null;
    }

    if (x === undefined) {
        return tags.undefined;
    }

    return Object.prototype.toString.call(x).slice(8, -1);
}

export function getUnit(x: Date, unit?: DateUnit): number {
    if (unit === undefined) {
        return x.getTime();
    }

    if (unit === "year") {
        return x.getFullYear();
    }

    if (unit === "month") {
        return x.getMonth();
    }

    if (unit === "date") {
        return x.getDate();
    }

    if (unit === "hour") {
        return x.getHours();
    }

    if (unit === "minute") {
        return x.getMinutes();
    }

    if (unit === "second") {
        return x.getSeconds();
    }

    if (unit === "millisecond") {
        return x.getMilliseconds();
    }

    return -1;
}

export function toDate(x: unknown): Date {
    if (x instanceof Date) {
        return x;
    }

    return new Date(to.string(x));
}

export function isValueJsonEncodable(x: unknown): boolean {
    try {
        switch (typeof x) {
            case "object":
                return x === null || isArrayJsonEncodable(x) || isObjectJsonEncodable(x);
            case "string":
            case "number":
            case "boolean":
                return true;
            default:
                return false;
        }
    } catch {
        return false;
    }
}

export function isArrayJsonEncodable(x: unknown): boolean {
    if (Array.isArray(x)) {
        return x.every(e => isValueJsonEncodable(e));
    }

    return false;
}

export function isObjectJsonEncodable(x: unknown): boolean {
    if (is.object.plain(x)) {
        return Reflect.ownKeys(x).every((e: string | symbol) => is.string(e) && isValueJsonEncodable(x[e]));
    }

    return false;
}

export function equalDeep(lhs: any, rhs: any, comparator?: (lhs?: any, rhs?: any) => boolean | undefined, ref: RefStack = new RefStack()): boolean {
    if (is.notNil(comparator)) {
        const comparatorResult: boolean | undefined = comparator(lhs, rhs);

        if (is.notNil(comparatorResult)) {
            return comparatorResult;
        }
    }

    const typeL: string = typeof lhs;
    const typeR: string = typeof rhs;

    if (typeL === typeR) {
        switch (typeL) {
            case "number":
                return lhs === rhs || Object.is(lhs, rhs);
            case "object":
                break;
            default:
                return lhs === rhs;
        }
    }

    if (Object.is(lhs, rhs)) {
        return true;
    }

    const tagsL: string = getTag(lhs);
    const tagsR: string = getTag(rhs);

    if (tagsL !== tagsR) {
        return false;
    }

    if (ref.has(lhs, rhs)) {
        return true;
    }

    ref.add(lhs, rhs);

    try {
        switch (tagsL) {
            case tags.string:
                return equalDeep(lhs.toString(), rhs.toString(), comparator);
            case tags.number:
            case tags.date:
                return equalDeep(lhs.valueOf(), rhs.valueOf(), comparator);
            case tags.boolean:
            case tags.symbol:
                return Object.is(lhs.valueOf(), rhs.valueOf());
            case tags.function:
            case tags.asyncFunction:
            case tags.generatorFunction:
            case tags.asyncGeneratorFunction:
                return lhs === rhs;
            case tags.regExp:
                return lhs.source === rhs.source && lhs.flags === rhs.flags;
            case tags.error:
            case tags.domException:
                return lhs.name === rhs.name && lhs.message === rhs.message;
            case tags.map:
                if (lhs.size !== rhs.size) {
                    return false;
                }

                for (const [keyL, valueL] of lhs.entries()) {
                    if (!rhs.has(keyL) || !equalDeep(valueL, rhs.get(keyL), comparator, ref)) {
                        return false;
                    }
                }

                return true;
            case tags.set:
                if (lhs.size !== rhs.size) {
                    return false;
                }

                const arrayL: any[] = Array.prototype.slice.call(lhs);
                const arrayR: any[] = Array.prototype.slice.call(rhs);

                for (const valueL of arrayL) {
                    const index: number = arrayR.findIndex(valueR => equalDeep(valueL, valueR, comparator, ref));

                    if (index === -1) {
                        return false;
                    }

                    arrayR.splice(index, 1);
                }

                return true;
            case tags.array:
            case tags.uint8Array:
            case tags.uint16Array:
            case tags.uint32Array:
            case tags.uint8ClampedArray:
            case tags.int8Array:
            case tags.int16Array:
            case tags.int32Array:
            case tags.bigUint64Array:
            case tags.bigInt64Array:
            case tags.float32Array:
            case tags.float64Array:
                if (is.buffer(lhs) !== is.buffer(rhs) || lhs.length !== rhs.length) {
                    return false;
                }

                for (let i: number = 0; i < lhs.length; i++) {
                    if (!equalDeep(to.object.get(lhs, i), to.object.get(rhs, i), comparator, ref)) {
                        return false;
                    }
                }

                return true;
            case tags.arrayBuffer:
                if (lhs.byteLength !== rhs.byteLength) {
                    return false;
                }

                return equalDeep(new Uint8Array(lhs), new Uint8Array(rhs), comparator, ref);
            case tags.dataView:
                if (lhs.byteLength !== rhs.byteLength || lhs.byteOffset !== rhs.byteOffset) {
                    return false;
                }

                return equalDeep(lhs.buffer, rhs.buffer, comparator, ref);
            case tags.object:
                if (!equalDeep(lhs.constructor, rhs.constructor, comparator, ref) && (!is.object.plain(lhs) || !is.object.plain(rhs))) {
                    return false;
                }

                const keys1L: (string | symbol)[] = getEnumerableProperties(lhs);
                const keys1R: (string | symbol)[] = getEnumerableProperties(rhs);

                if (keys1L.length !== keys1R.length) {
                    return false;
                }

                for (const key1L of keys1L) {
                    if (!equalDeep(to.object.get(lhs, key1L), to.object.get(rhs, key1L), comparator, ref)) {
                        return false;
                    }
                }

                return true;
            default:
                if (lhs === rhs) {
                    return true;
                }

                const keys2L: (string | symbol)[] = getPrototypeProperties(lhs);
                const keys2R: (string | symbol)[] = getPrototypeProperties(rhs);

                if (keys2L.length !== keys2R.length) {
                    return false;
                }

                if (tagsL === tags.file || tagsL === tags.blob) {
                    keys2L.push("size", "type");
                }

                for (const key2L of keys2L) {
                    if (!equalDeep(to.object.get(lhs, key2L), to.object.get(rhs, key2L), comparator, ref)) {
                        return false;
                    }
                }

                return true;
        }
    } finally {
        ref.remove(lhs, rhs);
    }
}

export function cloneDeep<T>(x: T, ref: Map<any, any> = new Map()): T {
    if (is.primitive(x)) {
        return x;
    }

    if (ref.has(x)) {
        return ref.get(x);
    }

    if (is.date(x)) {
        return new Date(x.getTime()) as T;
    }

    if (is.buffer(x)) {
        return x.subarray() as T;
    }

    if (is.array.buffer(x) || is.sharedArrayBuffer(x)) {
        return x.slice(0) as T;
    }

    if (is.regexp(x)) {
        const regexp: any = new RegExp(x.source, x.flags);

        regexp.lastIndex = x.lastIndex;

        return regexp;
    }
    if (is.array(x)) {
        const array: any = new Array(x.length);

        ref.set(x, array);

        for (let i: number = 0; i < x.length; i++) {
            array[i] = cloneDeep(to.object.get(x, i), ref);
        }
        if (is.in(x, "index")) {
            array.index = x.index;
        }

        if (is.in(x, "input")) {
            array.input = x.input;
        }

        return array;
    }
    if (is.map(x)) {
        const map: any = new Map();

        ref.set(x, map);

        for (const [key, value] of x) {
            map.set(key, cloneDeep(value, ref));
        }

        return map;
    }
    if (is.set(x)) {
        const set: any = new Set();

        ref.set(x, set);

        for (const value of x) {
            set.add(cloneDeep(value, ref));
        }

        return set;
    }
    if (is.array.typed(x)) {
        const typedArray = new (Object.getPrototypeOf(x).constructor)(x.length);

        ref.set(x, typedArray);

        for (let i: number = 0; i < x.length; i++) {
            typedArray[i] = cloneDeep(to.object.get(x, i), ref);
        }

        return typedArray;
    }
    if (is.dataView(x)) {
        const dataView: any = new DataView(x.buffer.slice(0), x.byteOffset, x.byteLength);

        ref.set(x, dataView);

        copyProperties(x, dataView, ref);

        return dataView;
    }
    if (is.file(x)) {
        const file: any = new File([x], x.name, { type: x.type });

        ref.set(x, file);

        copyProperties(x, file, ref);

        return file;
    }
    if (is.blob(x)) {
        const blob: any = new Blob([x], { type: x.type });

        ref.set(x, blob);

        copyProperties(x, blob, ref);

        return blob;
    }
    if (is.error(x)) {
        const error: any = new (x.constructor as { new (): Error })();

        ref.set(x, error);

        error.message = x.message;
        error.name = x.name;
        error.stack = x.stack;

        if (is.in(x, "cause")) {
            error.cause = x.cause;
        }

        copyProperties(x, error, ref);

        return error;
    }
    if (is.object(x)) {
        const object: any = {};

        ref.set(x, object);

        copyProperties(x, object, ref);

        return object;
    }

    return x;
}

export function omitDeep(x: any, paths: string[][]): any {
    if (x === null || typeof x !== 'object') {
        return x;
    }

    if (Array.isArray(x)) {
        return x.map((e: any) => omitDeep(e, paths));
    }

    const omitted: Set<string> = new Set<string>();
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
        if (!Object.prototype.hasOwnProperty.call(x, key)) {
            continue;
        }

        if (omitted.has(key)) {
            continue;
        }

        if (next[key]) {
            obj[key] = omitDeep(to.object.get(x, key), next[key]);
        } else {
            obj[key] = omitDeep(to.object.get(x, key), []);
        }
    }

    return obj;
}

export function setImmutableProperty(x: any, prop: PropertyKey, value?: any): void {
    Object.defineProperty(x, prop, {
        configurable: false,
        enumerable: false,
        writable: false,
        ...(value !== undefined && { value }),
    });
}

export function setUnenumerableProperty(x: any, prop: PropertyKey, value?: any): void {
    Object.defineProperty(x, prop, {
        configurable: true,
        enumerable: false,
        writable: false,
        ...(value !== undefined && { value }),
    });
}

export function observeHTMLElement<T extends HTMLElement>(x: T, handler: HTMLElementObserverHandler): Observable<T> {
    if (is.object.observable(x)) x.revoke();

    let isObserve: boolean = false;
    let revoke: () => void = (): void => {};
    const observerInit: MutationObserverInit = {};
    const observer: MutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
        for (const mutation of mutations) {
            const target: Node = mutation.target;

            switch (mutation.type) {
                case "attributes":
                    if (handler.attributes) {
                        const attributeName: string | null = mutation.attributeName;

                        if (attributeName) {
                            const oldValue: string | null = mutation.oldValue;

                            if (target instanceof HTMLElement) {
                                const newValue: string | null = target.getAttribute(attributeName);

                                handler.attributes(target, {[attributeName]: oldValue}, {[attributeName]: newValue});
                            }
                        }
                    }

                    continue;
                case "characterData":
                    if (handler.data) {
                        let newValue: string | null = null;
                        const oldValue: string | null = mutation.oldValue;

                        if ("data" in target && typeof target.data === "string") {
                            newValue = target.data;
                        }

                        handler.data(target, oldValue, newValue);
                    }

                    continue;
                case "childList":
                    if (handler.children) {
                        handler.children(target, Array.prototype.slice.call(mutation.removedNodes), Array.prototype.slice.call(mutation.addedNodes));
                    }
            }
        }
    });

    if (handler.attributes && (isObserve = true)) {
        observerInit.attributes = true;
        observerInit.attributeOldValue = true;
    }

    if (handler.data && (isObserve = true)) {
        observerInit.characterData = true;
        observerInit.characterDataOldValue = true;
    }

    if (handler.children && (isObserve = true)) {
        observerInit.childList = true;
    }

    if (isObserve) {
        if (handler.deep) observerInit.subtree = true;

        revoke = (): void => observer.disconnect();
        observer.observe(x, observerInit);
    }

    setImmutableProperty(x, observableSymbol);
    setUnenumerableProperty(x, "revoke", revoke);

    return x as Observable<T>;
}

export function observeFunction<T extends (...args: any[]) => any>(x: T, handler: FunctionObserverHandler): Observable<T> {
    if (is.object.observable(x)) {
        x.revoke();
    }

    let revoked: boolean = false;
    const revoke: () => void = (): void => {
        if (revoked) {
            return;
        }

        revoked = true;
    };

    const proxy: T = new Proxy(x, {
        apply(target: T & ((...args: any[]) => any), thisArg: any, argArray: any[]): any {
            if (!revoked && handler.apply) {
                handler.apply(target, thisArg, argArray);
            }

            return Reflect.apply(target, thisArg, argArray);
        }
    });

    setImmutableProperty(x, observableSymbol);
    setUnenumerableProperty(x, "revoke", revoke);

    return proxy as Observable<T>;
}

export function observeObject<T extends object>(x: T, handler: ObjectObserverHandler, parent: boolean = true, ref: Set<object> = new Set()): Observable<T> {
    if (is.object.observable(x)) {
        x.revoke();
    }

    if (ref.has(x)) {
        return x as Observable<T>;
    }

    if (!is.object(x)) {
        return x;
    }

    ref.add(x);

    let revoked: boolean = false;

    const revoke: () => void = (): void => {
        if (revoked) {
            return;
        }

        revoked = true;

        if (!handler.deep) return;

        for (const key of to.object.keys(x)) {
            const value = x[key];

            if (is.object(value) && is.object.observable(value)) {
                const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(value, observableSymbol);

                if (!descriptor?.value) {
                    value.revoke();
                }
            }
        }
    };

    const proxy: T = new Proxy(x, {
        get(target: T, p: string | symbol, receiver: any): any {
            if (p === "revoke") {
                return revoke;
            }

            const value: any = Reflect.get(target, p, receiver);

            if (typeof p === "symbol" || isPrototypeProperty(x, p)) {
                return value;
            }

            if (!revoked && handler.get) {
                handler.get(target, p, value);
            }

            if (handler.deep && is.object(value)) {
                if (is.object.observable(value)) {
                    return value;
                }
                return observeObject<any>(value, handler, false, ref);
            }

            return value;
        },
        set(target: T, p: string | symbol, newValue: any, receiver: any): boolean {
            const oldValue: any = Reflect.get(target, p, receiver);
            let valueToSet: any = newValue;

            if (typeof p === "symbol" || isPrototypeProperty(x, p)) {
                return Reflect.set(target, p, valueToSet, receiver);
            }

            if (handler.deep && is.object(valueToSet)) {
                if (is.object.observable(newValue)) {
                    valueToSet = newValue;
                } else {
                    valueToSet = observeObject(newValue, handler, false, ref);
                }
            }

            const result: boolean = Reflect.set(target, p, valueToSet, receiver);

            if (!revoked && handler.set) {
                handler.set(target, p, oldValue, newValue);
            }

            return result;
        },
        deleteProperty(target: T, p: string | symbol): boolean {
            const oldValue: any = Reflect.get(target, p);
            const result: boolean = Reflect.deleteProperty(target, p);

            if (typeof p === "symbol" || isPrototypeProperty(x, p)) {
                return result;
            }

            if (!revoked && handler.delete) {
                handler.delete(target, p, oldValue);
            }

            if (handler.deep && is.object.observable(oldValue)) {
                oldValue.revoke();
            }

            return result;
        }
    });

    setImmutableProperty(x, observableSymbol, parent);
    setUnenumerableProperty(x, "revoke", revoke);

    if (handler.deep) {
        for (const key of to.object.keys(x)) {
            const value: T[keyof T] | undefined = to.object.get(x, key);

            if (value) {
                to.object.set(x, key, observeObject(value, handler, false, ref));
            }
        }
    }

    return proxy as Observable<T>;
}

export function isPrototypeProperty(x: any, p: string): boolean {
    return x != null && Array.prototype.concat.call(Object.getOwnPropertyNames(Object.prototype), Object.getOwnPropertyNames(Object.getPrototypeOf(x).constructor.prototype)).includes(p);
}

function getEnumerableProperties(x: any): (string | symbol)[] {
    return Array.prototype.concat.call(Object.keys(x), Object.getOwnPropertySymbols(x).filter((symbol: symbol) => Object.prototype.propertyIsEnumerable.call(x, symbol)));
}

function getPrototypeProperties(x: any): (string | symbol)[] {
    return Array.prototype.concat.call(Object.keys(x), Object.getOwnPropertySymbols(x), Object.getOwnPropertyNames(Object.getPrototypeOf(x)), Object.getOwnPropertySymbols(Object.getPrototypeOf(x)));
}

function copyProperties(lhs: any, rhs: any, stack?: Map<any, any>): void {
    const keys: (string | symbol)[] = getEnumerableProperties(lhs);

    for (let i: number = 0; i < keys.length; i++) {
        const key: string | symbol = keys[i];
        const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(rhs, key);

        if (descriptor === undefined || descriptor.writable) {
            rhs[key] = cloneDeep(to.object.get(lhs, key), stack);
        }
    }
}