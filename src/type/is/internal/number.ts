import {is} from "../core/is";
import {Range} from "../../utils/types";

export interface NumberPredicate {
    (x: unknown): x is number;

    nan(x: number): boolean;

    integer(x: number): boolean;

    decimal(x: number): boolean;

    safeInteger(x: number): boolean;

    unsafeInteger(x: number): boolean;

    finite(x: number): boolean;

    infinite(x: number): boolean;

    neg(x: number): boolean;

    pos(x: number): boolean;

    neg0(x: number): boolean;

    pos0(x: number): boolean;

    zero(x: number): boolean;

    even(x: number): boolean;

    odd(x: number): boolean;

    lt(x: number, y: number): boolean;

    gt(x: number, y: number): boolean;

    le(x: number, y: number): boolean;

    ge(x: number, y: number): boolean;

    eq(x: number, y: number): boolean;

    ne(x: number, y: number): boolean;

    bt(x: number, min: unknown, max: number, range?: Range): boolean;

    index(x: number): boolean;
}

export const $number: NumberPredicate = Object.assign(
    function $number(x: unknown): x is number {
        return typeof x === "number";
    },
    {
        nan: function $nan(x: number): boolean {
            return isNaN(x);
        },

        integer: function $integer(x: number): boolean {
            return Number.isInteger(x);
        },

        decimal: function $decimal(x: number): boolean {
            return !Number.isInteger(x);
        },

        safeInteger: function $safeInteger(x: number): boolean {
            return Number.isSafeInteger(x);
        },

        unsafeInteger: function $unsafeInteger(x: number): boolean {
            return !Number.isSafeInteger(x);
        },

        finite: function $finite(x: number): boolean {
            return Number.isFinite(x);
        },

        infinite: function $infinite(x: number): boolean {
            return !Number.isFinite(x);
        },

        neg: function $neg(x: number): boolean {
            return x < 0;
        },

        pos: function $pos(x: number): boolean {
            return x > 0;
        },

        neg0: function $neg0(x: number): boolean {
            return x <= 0;
        },

        pos0: function $pos0(x: number): boolean {
            return x >= 0;
        },

        zero: function $zero(x: number): boolean {
            return x === 0;
        },

        even: function $even(x: number): boolean {
            return x % 2 === 0;
        },

        odd: function $odd(x: number): boolean {
            return x % 2 === 1;
        },

        lt: function $lt(x: number, y: number): boolean {
            return x < y;
        },

        gt: function $gt(x: number, y: number): boolean {
            return x > y;
        },

        le: function $le(x: number, y: number): boolean {
            return x <= y;
        },

        ge: function $ge(x: number, y: number): boolean {
            return x >= y;
        },

        eq: function $eq(x: number, y: number): boolean {
            return x === y;
        },

        ne: function $eq(x: number, y: number): boolean {
            return x !== y;
        },

        bt: function $bt(x: number, min: number, max: number, range: Range = "[]"): boolean {
            return (range.charAt(0) === "(" ? is.number.gt(x, min) : is.number.ge(x, min)) && (range.charAt(0) === ")" ? is.number.lt(x, max) : is.number.le(x, max));
        },

        index: function $index(x: number): boolean {
            return is.number.safeInteger(x) && is.number.pos0(x);
        }
    }
);