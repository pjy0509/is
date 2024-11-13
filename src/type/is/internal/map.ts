import {is} from "../core/is";
import {Constructor, ConstructorKey, PrimitiveType, PrimitiveTypeKey} from "../../utils/types";

export interface MapPredicate {
    <T, U>(x: unknown): x is Map<T, U>;

    is<T extends PrimitiveTypeKey, U extends PrimitiveTypeKey>(x: Map<unknown, unknown>, keyType: T, valueType: U): x is Map<PrimitiveType<T>, PrimitiveType<U>>;

    is<T extends PrimitiveTypeKey, U extends ConstructorKey>(x: Map<unknown, unknown>, keyType: T, valueType: U): x is Map<PrimitiveType<T>, Constructor<any>>;

    is<T extends PrimitiveTypeKey, U>(x: Map<unknown, unknown>, keyType: T, valueType: Constructor<U>): x is Map<PrimitiveType<T>, U>;

    is<T extends ConstructorKey, U extends PrimitiveTypeKey>(x: Map<unknown, unknown>, keyType: T, valueType: U): x is Map<Constructor<any>, PrimitiveType<U>>;

    is<T extends ConstructorKey, U extends ConstructorKey>(x: Map<unknown, unknown>, keyType: T, valueType: U): x is Map<Constructor<any>, Constructor<any>>;

    is<T extends ConstructorKey, U>(x: Map<unknown, unknown>, keyType: T, valueType: Constructor<U>): x is Map<Constructor<any>, U>;

    is<T, U extends PrimitiveTypeKey>(x: Map<unknown, unknown>, keyType: Constructor<T>, valueType: U): x is Map<T, PrimitiveType<U>>;

    is<T, U extends ConstructorKey>(x: Map<unknown, unknown>, keyType: Constructor<T>, valueType: U): x is Map<T, Constructor<any>>;

    is<T, U>(x: Map<unknown, unknown>, keyType: Constructor<T>, valueType: Constructor<U>): x is Map<T, U>;

    keyIs<T extends PrimitiveTypeKey, U>(x: Map<unknown, U>, keyType: T): x is Map<PrimitiveType<T>, U>;

    keyIs<T extends ConstructorKey, U>(x: Map<unknown, U>, keyType: T): x is Map<Constructor<any>, U>;

    keyIs<T, U>(x: Map<unknown, U>, keyType: Constructor<T>): x is Map<T, U>;

    valueIs<T, U extends PrimitiveTypeKey>(x: Map<T, unknown>, valueType: U): x is Map<T, PrimitiveType<U>>;

    valueIs<T, U extends ConstructorKey>(x: Map<T, unknown>, valueType: U): x is Map<T, Constructor<any>>;

    valueIs<T, U>(x: Map<T, unknown>, valueType: Constructor<U>): x is Map<T, U>;

    empty<T, U>(x: Map<T, U>): boolean;

    nil<T, U>(x: Map<U, T | null | undefined>): x is Map<U, T | null | undefined>;

    notNil<T, U>(x: Map<U, T | null | undefined>): x is Map<U, Exclude<T, null | undefined>>;
}

export const $map: MapPredicate = Object.assign(
    function $map<T, U>(x: unknown): x is Map<T, U> {
        return x instanceof Map;
    },
    {
        is: function $is<T, U>(x: Map<unknown, unknown>, keyType: any, valueType: any): x is Map<T, U> {
            return is.map.keyIs(x, keyType) && is.map.valueIs(x, valueType);
        },

        keyIs: function $keyIs<T, U>(x: Map<unknown, U>, keyType: Constructor<T>): x is Map<T, U> {
            return is.array.is(Array.prototype.slice.call(x.keys()), keyType);
        },

        valueIs: function $valueIs<T, U>(x: Map<U, unknown>, valueType: Constructor<T>): x is Map<U, T> {
            return is.array.is(Array.prototype.slice.call(x.values()), valueType);
        },

        empty: function $empty<T, U>(x: Map<T, U>): boolean {
            return !x.size;
        },

        nil: function $nil<T, U>(x: Map<U, T | null | undefined>): x is Map<U, T | null | undefined> {
            return is.array.nil(Array.prototype.slice.call(x.values()));
        },

        notNil: function $notNil<T, U>(x: Map<U, T | null | undefined>): x is Map<U, Exclude<T, null | undefined>> {
            return !is.map.nil(x);
        },
    }
);