import {is} from "../core/is";
import {Constructor, PrimitiveType, PrimitiveTypeKey} from "../../utils/types";

export interface ArrayPredicate {
    <T = unknown>(x: unknown): x is Array<T>;

    is<T extends PrimitiveTypeKey>(x: Array<unknown>, type: T): x is Array<PrimitiveType<T>>;

    is<T>(x: Array<unknown>, type: Constructor<T>): x is Array<T>;

    typed(x: unknown): x is Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array;

    buffer(x: unknown): x is ArrayBuffer;

    like<T = unknown>(x: unknown): x is ArrayLike<T>;

    empty<T = unknown>(x: ArrayLike<T>): boolean;

    unique<T = unknown>(x: ArrayLike<T>): boolean;

    allEmpty<T = unknown>(x: ArrayLike<T>): boolean;

    anyEmpty<T = unknown>(x: ArrayLike<T>): boolean;

    notEmpty<T = unknown>(x: ArrayLike<T>): boolean;

    allNil<T = unknown>(x: ArrayLike<T | null | undefined>): x is ArrayLike<null | undefined>;

    anyNil<T = unknown>(x: ArrayLike<T | null | undefined>): x is ArrayLike<T | null | undefined>;

    notNil<T = unknown>(x: ArrayLike<T | null | undefined>): x is ArrayLike<Exclude<T, null | undefined>>;
}

export const $array: ArrayPredicate = Object.assign(
    function $array<T = unknown>(x: unknown): x is Array<T> {
        return Array.isArray(x);
    },
    {
        is: function $is<T>(x: Array<unknown>, type: any): x is Array<T> {
            return x.every(e => is(e, type));
        },

        typed: function $typed(x: unknown): x is Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array {
            return ArrayBuffer.isView(x) && !(x instanceof DataView);
        },

        buffer: function $buffer(x: unknown): x is ArrayBuffer {
            return x instanceof ArrayBuffer;
        },

        like: function $like<T = unknown>(x: unknown): x is ArrayLike<T> {
            return x != null && is.in(x, "length") && is.propertyKey(x.length) && is.index(x.length) && !(typeof x === "function");
        },

        empty: function $empty<T = unknown>(x: ArrayLike<T>): boolean {
            return !x.length;
        },

        unique: function $unique<T = unknown>(x: ArrayLike<T>): boolean {
            return is.array(x) ? x.length === new Set(x).size : is.array.unique(Array.from(x));
        },

        allEmpty: function $allEmpty<T = unknown>(x: ArrayLike<T>): boolean {
            if (x.length <= 0) return false;

            return !Array.from({length: x.length}, (_, i) => i in x).includes(true);
        },

        anyEmpty: function $anyEmpty<T = unknown>(x: ArrayLike<T>): boolean {
            return Array.from({length: x.length}, (_, i) => i in x).includes(false);
        },

        notEmpty: function $notEmpty<T = unknown>(x: ArrayLike<T>): boolean {
            return !is.array.anyEmpty(x);
        },

        allNil: function $allNil<T = unknown>(x: ArrayLike<T | null | undefined>): x is ArrayLike<null | undefined> {
            return is.array(x) ? x.every(e => e == null) : is.array.allNil(Array.from(x));
        },

        anyNil: function $anyNil<T = unknown>(x: ArrayLike<T | null | undefined>): x is ArrayLike<T | null | undefined> {
            return is.array(x) ? x.some(e => e == null) : is.array.anyNil(Array.from(x));
        },

        notNil: function $notNil<T = unknown>(x: ArrayLike<T | null | undefined>): x is ArrayLike<Exclude<T, null | undefined>> {
            return !is.array.anyNil(x);
        },
    }
);