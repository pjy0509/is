import {LOWER_SURROGATE_START, tags, UPPER_SURROGATE_START} from './constants';
import {DateUnit} from "./types";
import {RefStack} from "./RefStack";
import {is} from "../is/core/is";

export function getTag(x: any): string {
    if (x === null) return tags.null;
    if (x === undefined) return tags.undefined;

    return Object.prototype.toString.call(x);
}

export function getByte(x: File, from: number, to: number): Promise<Array<string>> {
    return new Promise(resolve => {
        const reader: FileReader = new FileReader();

        reader.onloadend = () => {
            const result: ArrayBuffer | string | null = reader.result;

            if (!is.array.buffer(result)) return resolve([]);

            resolve(Array.from(new Uint8Array(result)).map(to16));
        };

        reader.onerror = () => {
            resolve([]);
        };

        reader.readAsArrayBuffer(x.slice(from, to));
    });
}

export function getCharType(x: number): number {
    if (x >= 97 && x <= 122) return 0;
    if (x >= 65 && x <= 90) return 1;
    if (x >= 48 && x <= 57) return 2;

    return -1;
}

export function getUnit(x: Date, unit?: DateUnit): number {
    if (unit === undefined) return x.getTime();
    if (unit === "year") return x.getFullYear();
    if (unit === "month") return x.getMonth();
    if (unit === "date") return x.getDate();
    if (unit === "hour") return x.getHours();
    if (unit === "minute") return x.getMinutes();
    if (unit === "second") return x.getSeconds();
    if (unit === "millisecond") return x.getMilliseconds();
    return -1;
}

export function toString(x: unknown): string {
    return x + "";
}

export function toNumber(x: unknown): number {
    return +(x as any);
}

export function toBoolean(x: unknown): boolean {
    return !!x;
}

export function toArray(x: unknown): Array<unknown> {
    return is.array.like(x) ? Array.from(x) : [x];
}

export function toDate(x: unknown): Date {
    if (x instanceof Date) return x;

    return new Date(toString(x));
}

export function isValueJsonEncodable(x: unknown): boolean {
    switch (typeof x) {
        case "object":
            return x === null || x instanceof Date || isArrayJsonEncodable(x) || isObjectJsonEncodable(x);
        case "string":
        case "number":
        case "boolean":
            return true;
        default:
            return false;
    }
}

function isArrayJsonEncodable(x: unknown): boolean {
    if (Array.isArray(x)) return x.every(e => isValueJsonEncodable(e));

    return false;
}

function isObjectJsonEncodable(x: unknown): boolean {
    if (is.object.plain(x)) return Reflect.ownKeys(x).every(e => is.string(e) && isValueJsonEncodable(x[e]));

    return false;
}

export function equalDeep(lhs: any, rhs: any, comparator?: (lhs?: any, rhs?: any) => boolean | undefined, refStack: RefStack = new RefStack()): boolean {
    if (is.notNil(comparator)) {
        const comparatorResult: boolean | undefined = comparator(lhs, rhs);

        if (is.notNil(comparatorResult)) return comparatorResult;
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

    if (Object.is(lhs, rhs)) return true;

    const tagsL: string = getTag(lhs);
    const tagsR: string = getTag(rhs);

    if (tagsL !== tagsR) return false;
    if (refStack.has(lhs, rhs)) return true;

    refStack.add(lhs, rhs);

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
                return lhs.name === rhs.name && lhs.message === rhs.message;
            case tags.map:
                if (lhs.size !== rhs.size) return false;

                for (const [keyL, valueL] of lhs.entries()) {
                    if (!rhs.has(keyL) || !equalDeep(valueL, rhs.get(keyL), comparator, refStack)) return false;
                }

                return true;
            case tags.set:
                if (lhs.size !== rhs.size) return false;

                const arrayL: Array<any> = Array.from(lhs);
                const arrayR: Array<any> = Array.from(rhs);

                for (const valueL of arrayL) {
                    const index = arrayR.findIndex(valueR => equalDeep(valueL, valueR, comparator, refStack));

                    if (index === -1) return false;

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
                if (is.buffer(lhs) !== is.buffer(rhs) || lhs.length !== rhs.length) return false;

                for (let i = 0; i < lhs.length; i++) {
                    if (!equalDeep(lhs[i], rhs[i], comparator, refStack)) return false;
                }

                return true;
            case tags.arrayBuffer:
                if (lhs.byteLength !== rhs.byteLength) return false;

                return equalDeep(new Uint8Array(lhs), new Uint8Array(rhs), comparator, refStack);
            case tags.dataView:
                if (lhs.byteLength !== rhs.byteLength || lhs.byteOffset !== rhs.byteOffset) return false;

                return equalDeep(lhs.buffer, rhs.buffer, comparator, refStack);
            case tags.object:
                if (!equalDeep(lhs.constructor, rhs.constructor, comparator, refStack) && (!is.object.plain(lhs) || !is.object.plain(rhs))) return false;

                const keys1L: Array<string | symbol> = getEnumerableProperties(lhs);
                const keys1R: Array<string | symbol> = getEnumerableProperties(rhs);

                if (keys1L.length !== keys1R.length) return false;

                for (const key1L of keys1L) {
                    if (!equalDeep(lhs[key1L], rhs[key1L], comparator, refStack)) return false;
                }

                return true;
            default:
                if (lhs === rhs) return true;

                const keys2L: Array<string | symbol> = getPrototypeProperties(lhs);
                const keys2R: Array<string | symbol> = getPrototypeProperties(rhs);

                if (keys2L.length !== keys2R.length) return false;

                if (tagsL === tags.file || tagsL === tags.blob) {
                    keys2L.push("size");
                    keys2L.push("type");
                }

                for (const key2L of keys2L) {
                    if (!equalDeep(lhs[key2L], rhs[key2L], comparator, refStack)) return false;
                }

                return true;
        }
    } finally {
        refStack.remove(lhs, rhs);
    }
}

export function surrogatePair(upper: number, lower: number): number {
    return ((upper - UPPER_SURROGATE_START) << 10) + (lower - LOWER_SURROGATE_START) + 0x10000;
}

function getEnumerableProperties(x: any): Array<string | symbol> {
    return Array.prototype.concat.call(Object.keys(x), Object.getOwnPropertySymbols(x).filter(symbol => Object.prototype.propertyIsEnumerable.call(x, symbol)));
}

function getPrototypeProperties(x: any): Array<string | symbol> {
    return Array.prototype.concat.call(Object.keys(x), Object.getOwnPropertySymbols(x), Object.getOwnPropertyNames(Object.getPrototypeOf(x)), Object.getOwnPropertySymbols(Object.getPrototypeOf(x)));
}

function to16(x: number): string {
    return x.toString(16).padStart(2, "0");
}