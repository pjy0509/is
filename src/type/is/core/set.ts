import {Constructor, ConstructorKey, PrimitiveType, PrimitiveTypeKey} from "../../utils/types";
import {$predicate} from "../internal/set/predicate";
import {$is} from "../internal/set/is";
import {$empty} from "../internal/set/empty";
import {$nil} from "../internal/set/nil";
import {$notNil} from "../internal/set/notNil";

export interface SetPredicate {
    (x: unknown): x is Set<unknown>;

    is<T extends PrimitiveTypeKey>(x: Set<unknown>, type: T): x is Set<PrimitiveType<T>>;

    is<T extends ConstructorKey>(x: Set<unknown>, type: T): x is Set<Constructor<any>>;

    is<T>(x: Set<unknown>, type: Constructor<T>): x is Set<T>;

    empty<T>(x: Set<T>): boolean;

    nil<T>(x: Set<T | null | undefined>): x is Set<T | null | undefined>;

    notNil<T>(x: Set<T | null | undefined>): x is Set<Exclude<T, null | undefined>>;
}

export const $set: SetPredicate = Object.assign(
    $predicate,
    {
        is: $is,
        empty: $empty,
        nil: $nil,
        notNil: $notNil
    }
);