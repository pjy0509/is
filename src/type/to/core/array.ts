import {Truthy} from "../../utils/types";
import {$converter} from "../internal/array/converter";
import {$compact} from "../internal/array/compact";
import {$chunk} from "../internal/array/chunk";
import {$drop} from "../internal/array/drop";
import {$dropLast} from "../internal/array/dropLast";
import {$take} from "../internal/array/take";
import {$takeLast} from "../internal/array/takeLast";
import {$shuffle} from "../internal/array/shuffle";
import {$flat} from "../internal/array/flat";
import {$group} from "../internal/array/group";
import {$fill} from "../internal/array/fill";
import {$entries} from "../internal/array/entries";
import {$at} from "../internal/array/at";
import {$ats} from "../internal/array/ats";
import {$uniq} from "../internal/array/uniq";
import {$union} from "../internal/array/union";
import {$different} from "../internal/array/diffrent";
import {$intersection} from "../internal/array/intersection";
import {$rand} from "../internal/array/rand";
import {$rands} from "../internal/array/rands";

export interface ArrayConverter {
    (): [];

    <T>(x: ArrayLike<T>): T[];

    <T>(x: Iterable<T>): T[];

    <T>(x: T): T[];

    <T extends any[]>(...x: T): T[number][];

    compact<T>(x: ArrayLike<T>): Truthy<T>[];

    chunk<T>(x: ArrayLike<T>, size: number): T[][];

    drop<T>(x: ArrayLike<T>, until: number | ((value: T, index: number, arr: readonly T[]) => boolean)): T[];

    dropLast<T>(x: ArrayLike<T>, until: number | ((value: T, index: number, arr: readonly T[]) => boolean)): T[];

    take<T>(x: ArrayLike<T>, until: number | ((value: T, index: number, arr: readonly T[]) => boolean)): T[];

    takeLast<T>(x: ArrayLike<T>, until: number | ((value: T, index: number, arr: readonly T[]) => boolean)): T[];

    shuffle<T>(x: ArrayLike<T>): T[];

    flat<T, D extends number>(x: ArrayLike<T>, depth?: D): FlatArray<T[], D>[];

    group<T, K extends PropertyKey>(x: ArrayLike<T>, getKey: (item: T) => K): Record<K, T[]>;

    fill<T = number>(x: number, mapfn?: (i: number) => T): T[];

    entries<T>(x: ArrayLike<T>): [string, T][];

    at<T>(x: ArrayLike<T>, n: number): T | undefined;

    ats<T>(x: ArrayLike<T>, ...n: number[]): (T | undefined)[];

    uniq<T>(x: ArrayLike<T>, predicate?: (lhs: T, rhs: T) => boolean): T[];

    union<T, U>(lhs: ArrayLike<T>, rhs: ArrayLike<U>, predicate?: (lhs: T, rhs: U) => boolean): (T | U)[];

    different<T>(lhs: ArrayLike<T>, rhs: ArrayLike<T>, predicate?: (lhs: T, rhs: T) => boolean): T[];

    intersection<T>(lhs: ArrayLike<T>, rhs: ArrayLike<T>, predicate?: (lhs: T, rhs: T) => boolean): T[];

    rand<T>(lhs: ArrayLike<T>): T;

    rands<T>(lhs: ArrayLike<T>, n: number): T[];

    [Symbol.toStringTag]: string;
}

export const $array: ArrayConverter = Object.assign(
    $converter,
    {
        compact: $compact,
        chunk: $chunk,
        drop: $drop,
        dropLast: $dropLast,
        take: $take,
        takeLast: $takeLast,
        shuffle: $shuffle,
        flat: $flat,
        group: $group,
        fill: $fill,
        entries: $entries,
        at: $at,
        ats: $ats,
        uniq: $uniq,
        union: $union,
        different: $different,
        intersection: $intersection,
        rand: $rand,
        rands: $rands,

        [Symbol.toStringTag]: "To.Array"
    }
)