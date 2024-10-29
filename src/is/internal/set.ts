import {is} from "../core/is";
import {Constructor, PrimitiveType, PrimitiveTypeKey} from "../utils/types";

export interface SetPredicate {
    <T = unknown>(x: unknown): x is Set<T>;

    is<T extends PrimitiveTypeKey>(x: Set<unknown>, type: T): x is Set<PrimitiveType<T>>;

    is<T>(x: Set<unknown>, type: Constructor<T>): x is Set<T>;

    empty<T = unknown>(x: Set<T>): boolean;

    allNil<T = unknown>(x: Set<T | null | undefined>): x is Set<null | undefined>;

    anyNil<T = unknown>(x: Set<T | null | undefined>): x is Set<T | null | undefined>;

    notNil<T = unknown>(x: Set<T | null | undefined>): x is Set<Exclude<T, null | undefined>>;
}

export const $set: SetPredicate = Object.assign(
    function $set<T = unknown>(x: unknown): x is Set<T> {
        return is(x, Set);
    },
    {
        is: function $is<T>(x: Set<unknown>, type: any): x is Set<T> {
            return is.array.is(Array.from(x), type);
        },

        empty: function $empty<T = unknown>(x: Set<T>): boolean {
            return !x.size;
        },

        allNil: function $allNil<T = unknown>(x: Set<T | null | undefined>): x is Set<null | undefined> {
            return is.array.allNil(Array.from(x));
        },

        anyNil: function $anyNil<T = unknown>(x: Set<T | null | undefined>): x is Set<T | null | undefined> {
            return is.array.anyNil(Array.from(x));
        },

        notNil: function $notNil<T = unknown>(x: Set<T | null | undefined>): x is Set<Exclude<T, null | undefined>> {
            return !is.set.anyNil(x);
        }
    }
);