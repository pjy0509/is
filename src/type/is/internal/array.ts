import {Constructor, ConstructorKey, PrimitiveType, PrimitiveTypeKey} from "../../utils/types";
import to from "../../to/index";
import is from "../index";

export interface ArrayPredicate {
    <T>(x: unknown): x is T[];

    is<T extends PrimitiveTypeKey>(x: unknown[], type: T): x is PrimitiveType<T>[];

    is<T extends ConstructorKey>(x: unknown[], type: T): x is Constructor<any>[];

    is<T>(x: unknown[], type: Constructor<T>): x is T[];

    typed(x: unknown): x is Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array;

    buffer(x: unknown): x is ArrayBuffer;

    like<T>(x: unknown): x is ArrayLike<T>;

    empty<T>(x: ArrayLike<T>): boolean;

    unique<T>(x: ArrayLike<T>): boolean;

    emptySlot<T>(x: ArrayLike<T>): boolean;

    nil<T>(x: ArrayLike<T | null | undefined>): x is ArrayLike<T | null | undefined>;

    notNil<T>(x: ArrayLike<T | null | undefined>): x is ArrayLike<Exclude<T, null | undefined>>;
}

export const $array: ArrayPredicate = Object.assign(
    function $array<T>(x: unknown): x is T[] {
        return Array.isArray(x);
    },
    {
        is: function $is<T>(x: unknown[], type: any): x is T[] {
            return x.every((e: unknown) => is(e, type));
        },

        typed: function $typed(x: unknown): x is Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array {
            return ArrayBuffer.isView(x) && !(x instanceof DataView);
        },

        buffer: function $buffer(x: unknown): x is ArrayBuffer {
            return x instanceof ArrayBuffer;
        },

        like: function $like<T>(x: unknown): x is ArrayLike<T> {
            if (x == null) {
                return false;
            }

            if (typeof x === "function") {
                return false;
            }

            if (!to.object.has(x, "length")) {
                return false;
            }

            let length = to.object.get(x, "length");

            return is.propertyKey(length) && is.index(length);
        },

        empty: function $empty<T>(x: ArrayLike<T>): boolean {
            return to.object.has(x, "length") && !to.object.get(x, "length");
        },

        unique: function $unique<T>(x: ArrayLike<T>): boolean {
            return is.array(x) ? to.object.get(x, "length") === new Set(to.object.values(x)).size : is.array.unique(Array.prototype.slice.call(to.object.values(x)));
        },

        emptySlot: function $emptySlot<T>(x: ArrayLike<T>): boolean {
            const length = to.object.get(x, "length");

            if (typeof length === "number") {
                return Array.from({length: length}, (_, i: number): boolean => to.object.has(x, i)).includes(false);
            }

            return false;
        },

        nil: function $nil<T>(x: ArrayLike<T | null | undefined>): x is ArrayLike<T | null | undefined> {
            return is.array(x) ? to.object.values(x).some((e: T | null | undefined): boolean => e == null) : is.array.nil(Array.prototype.slice.call(to.object.values(x)));
        },

        notNil: function $notNil<T>(x: ArrayLike<T | null | undefined>): x is ArrayLike<Exclude<T, null | undefined>> {
            return !is.array.nil(x);
        },
    }
);