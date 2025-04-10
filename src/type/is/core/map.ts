import {Constructor, ConstructorKey, PrimitiveType, PrimitiveTypeKey} from "../../utils/types";
import {$predicate} from "../internal/map/predicate";
import {$is} from "../internal/map/is";
import {$keyIs} from "../internal/map/keyIs";
import {$valueIs} from "../internal/map/valueIs";
import {$empty} from "../internal/map/empty";
import {$nil} from "../internal/map/nil";
import {$notNil} from "../internal/map/notNil";

export interface MapPredicate {
    (x: unknown): x is Map<unknown, unknown>;

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
    $predicate,
    {
        is: $is,
        keyIs: $keyIs,
        valueIs: $valueIs,
        empty: $empty,
        nil: $nil,
        notNil: $notNil,
    }
);