import {is} from "../core/is";
import {Constructor, PrimitiveType, PrimitiveTypeKey} from "../utils/types";

export interface MapPredicate {
    <T = unknown, U = unknown>(x: unknown): x is Map<T, U>;

    is<T extends PrimitiveTypeKey, U extends PrimitiveTypeKey>(x: Map<unknown, unknown>, keyType: T, valueType: U): x is Map<PrimitiveType<T>, PrimitiveType<U>>;

    is<T extends PrimitiveTypeKey, U>(x: Map<unknown, unknown>, keyType: T, valueType: Constructor<U>): x is Map<PrimitiveType<T>, U>;

    is<T, U extends PrimitiveTypeKey>(x: Map<unknown, unknown>, keyType: Constructor<T>, valueType: U): x is Map<T, PrimitiveType<U>>;

    is<T, U>(x: Map<unknown, unknown>, keyType: Constructor<T>, valueType: Constructor<U>): x is Map<T, U>;

    keyIs<T extends PrimitiveTypeKey, U>(x: Map<unknown, U>, keyType: T): x is Map<PrimitiveType<T>, U>;

    keyIs<T, U>(x: Map<unknown, U>, keyType: Constructor<T>): x is Map<T, U>;

    valueIs<T extends PrimitiveTypeKey, U>(x: Map<U, unknown>, valueType: T): x is Map<U, PrimitiveType<T>>;

    valueIs<T, U>(x: Map<U, unknown>, valueType: Constructor<T>): x is Map<U, T>;

    empty<T = unknown, U = unknown>(x: Map<T, U>): boolean;

    allNil<T = unknown, U = unknown>(x: Map<U, T | null | undefined>): x is Map<U, null | undefined>;

    anyNil<T = unknown, U = unknown>(x: Map<U, T | null | undefined>): x is Map<U, T | null | undefined>;

    notNil<T = unknown, U = unknown>(x: Map<U, T | null | undefined>): x is Map<U, Exclude<T, null | undefined>>;
}

export const $map: MapPredicate = Object.assign(
    function $map<T = unknown, U = unknown>(x: unknown): x is Map<T, U> {
        return x instanceof Map;
    },
    {
        is: function $is<T, U>(x: Map<unknown, unknown>, keyType: any, valueType: any): x is Map<T, U> {
            return is.map.keyIs(x, keyType) && is.map.valueIs(x, valueType);
        },

        keyIs: function $keyIs<T, U>(x: Map<unknown, U>, keyType: Constructor<T>): x is Map<T, U> {
            return is.array.is(Array.from(x.keys()), keyType);
        },

        valueIs: function $valueIs<T, U>(x: Map<U, unknown>, valueType: Constructor<T>): x is Map<U, T> {
            return is.array.is(Array.from(x.values()), valueType);
        },

        empty: function $empty<T = unknown, U = unknown>(x: Map<T, U>): boolean {
            return !x.size;
        },

        allNil: function $allNil<T = unknown, U = unknown>(x: Map<U, T | null | undefined>): x is Map<U, null | undefined> {
            return is.array.allNil(Array.from(x.values()));
        },

        anyNil: function $anyNil<T = unknown, U = unknown>(x: Map<U, T | null | undefined>): x is Map<U, T | null | undefined> {
            return is.array.anyNil(Array.from(x.values()));
        },

        notNil: function $notNil<T = unknown, U = unknown>(x: Map<U, T | null | undefined>): x is Map<U, Exclude<T, null | undefined>> {
            return !is.map.anyNil(x);
        }
    }
);