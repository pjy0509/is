import {is} from "../core/is";
import {Constructor, PrimitiveType, PrimitiveTypeKey} from "../utils/types";

export interface ArrayPredicate {
    <T = unknown>(x: unknown): x is Array<T>;

    is<T extends PrimitiveTypeKey>(x: Array<unknown>, type: T): x is Array<PrimitiveType<T>>;

    is<T>(x: Array<unknown>, type: Constructor<T>): x is Array<T>;

    typed(x: unknown): x is Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array;

    buffer(x: unknown): x is ArrayBuffer;

    like<T = unknown>(x: unknown): x is ArrayLike<T>;

    empty<T = unknown>(x: ArrayLike<T> | Array<T>): boolean;

    unique<T = unknown>(x: Array<T>): boolean;

    allSlotEmpty<T = unknown>(x: Array<T>): boolean;

    anySlotEmpty<T = unknown>(x: Array<T>): boolean;

    notSlotEmpty<T = unknown>(x: Array<T>): boolean;

    allNil<T = unknown>(x: Array<T | null | undefined>): x is Array<null | undefined>;

    anyNil<T = unknown>(x: Array<T | null | undefined>): x is Array<T | null | undefined>;

    notNil<T = unknown>(x: Array<T | null | undefined>): x is Array<Exclude<T, null | undefined>>;
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

        empty: function $empty<T = unknown>(x: ArrayLike<T> | Array<T>): boolean {
            return !x.length;
        },

        unique: function $unique<T = unknown>(x: Array<T>): boolean {
            return x.length === new Set(x).size;
        },

        allSlotEmpty: function $allSlotEmpty<T = unknown>(x: Array<T>): boolean {
            if (x.length <= 0) return false;

            return !Array.from({length: x.length}, (_, i) => i in x).includes(true);
        },

        anySlotEmpty: function $anySlotEmpty<T = unknown>(x: Array<T>): boolean {
            return Array.from({length: x.length}, (_, i) => i in x).includes(false);
        },

        notSlotEmpty: function $notSlotEmpty<T = unknown>(x: Array<T>): boolean {
            return !is.array.anySlotEmpty(x);
        },

        allNil: function $allNil<T = unknown>(x: Array<T | null | undefined>): x is Array<null | undefined> {
            return x.every(e => e == null);
        },

        anyNil: function $anyNil<T = unknown>(x: Array<T | null | undefined>): x is Array<T | null | undefined> {
            return x.some(e => e == null);
        },

        notNil: function $notNil<T = unknown>(x: Array<T | null | undefined>): x is Array<Exclude<T, null | undefined>> {
            return !is.array.anyNil(x);
        },
    }
);