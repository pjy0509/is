import {Constructor, ConstructorKey, PrimitiveType, PrimitiveTypeKey} from "../../utils/types";
import {$predicate} from "../internal/array/predicate";
import {$is} from "../internal/array/is";
import {$typed} from "../internal/array/typed";
import {$buffer} from "../internal/is/buffer";
import {$like} from "../internal/array/like";
import {$likeObject} from "../internal/array/likeObject";
import {$empty} from "../internal/array/empty";
import {$unique} from "../internal/array/unique";
import {$emptySlot} from "../internal/array/emptySlot";
import {$entries} from "../internal/array/entries";
import {$nil} from "../internal/array/nil";
import {$notNil} from "../internal/array/notNil";

export interface ArrayPredicate {
    (x: unknown): x is unknown[];

    is<T extends PrimitiveTypeKey>(x: unknown[], type: T): x is PrimitiveType<T>[];

    is<T extends ConstructorKey>(x: unknown[], type: T): x is Constructor<any>[];

    is<T>(x: unknown[], type: Constructor<T>): x is T[];

    typed(x: unknown): x is Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array;

    buffer(x: unknown): x is ArrayBuffer;

    like(x: unknown): x is ArrayLike<unknown>;

    likeObject(x: unknown): x is ArrayLike<unknown> & object;

    empty<T>(x: ArrayLike<T>): boolean;

    unique<T>(x: ArrayLike<T>): boolean;

    emptySlot<T>(x: ArrayLike<T>): boolean;

    entries(x: ArrayLike<unknown>): x is [any, any][];

    nil<T>(x: (T | null | undefined)[]): x is (T | null | undefined)[];

    nil<T>(x: ArrayLike<T | null | undefined>): x is ArrayLike<T | null | undefined>;

    notNil<T>(x: (T | null | undefined)[]): x is Exclude<T, null | undefined>[];

    notNil<T>(x: ArrayLike<T | null | undefined>): x is ArrayLike<Exclude<T, null | undefined>>;
}

export const $array: ArrayPredicate = Object.assign(
    $predicate,
    {
        is: $is,
        typed: $typed,
        buffer: $buffer,
        like: $like,
        likeObject: $likeObject,
        empty: $empty,
        unique: $unique,
        emptySlot: $emptySlot,
        entries: $entries,
        nil: $nil,
        notNil: $notNil,
    }
);