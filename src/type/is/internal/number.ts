import {is} from "../core/is";
import {Range} from "../../utils/types";
import {toNumber} from "../../utils/functions";

export interface NumberPredicate {
    (x: unknown): x is number;

    nan(x: unknown): boolean;

    integer(x: unknown): boolean;

    decimal(x: unknown): boolean;

    safeInteger(x: unknown): boolean;

    unsafeInteger(x: unknown): boolean;

    finite(x: unknown): boolean;

    infinite(x: unknown): boolean;

    neg(x: unknown): boolean;

    pos(x: unknown): boolean;

    neg0(x: unknown): boolean;

    pos0(x: unknown): boolean;

    zero(x: unknown): boolean;

    even(x: unknown): boolean;

    odd(x: unknown): boolean;

    lt(x: unknown, y: unknown): boolean;

    gt(x: unknown, y: unknown): boolean;

    le(x: unknown, y: unknown): boolean;

    ge(x: unknown, y: unknown): boolean;

    eq(x: unknown, y: unknown): boolean;

    ne(x: unknown, y: unknown): boolean;

    bt(x: unknown, min: unknown, max: unknown, range?: Range): boolean;

    index(x: unknown): boolean;
}

export const $number: NumberPredicate = Object.assign(
    function $number(x: unknown): x is number {
        return typeof x === "number";
    },
    {
        nan: function $nan(x: unknown): boolean {
            return is.number(x) ? isNaN(x) : is.number.nan(toNumber(x));
        },

        integer: function $integer(x: unknown): boolean {
            return is.number(x) ? Number.isInteger(x) : is.number.integer(toNumber(x));
        },

        decimal: function $decimal(x: unknown): boolean {
            return is.number(x) ? !Number.isInteger(x) : is.number.decimal(toNumber(x));
        },

        safeInteger: function $safeInteger(x: unknown): boolean {
            return is.number(x) ? Number.isSafeInteger(x) : is.number.safeInteger(toNumber(x));
        },

        unsafeInteger: function $unsafeInteger(x: unknown): boolean {
            return is.number(x) ? !Number.isSafeInteger(x) : is.number.unsafeInteger(toNumber(x));
        },

        finite: function $finite(x: unknown): boolean {
            return is.number(x) ? Number.isFinite(x) : is.number.finite(toNumber(x));
        },

        infinite: function $infinite(x: unknown): boolean {
            return is.number(x) ? !Number.isFinite(x) : is.number.infinite(toNumber(x));
        },

        neg: function $neg(x: unknown): boolean {
            return is.number(x) ? x < 0 : is.number.neg(toNumber(x));
        },

        pos: function $pos(x: unknown): boolean {
            return is.number(x) ? x > 0 : is.number.pos(toNumber(x));
        },

        neg0: function $neg0(x: unknown): boolean {
            return is.number(x) ? x <= 0 : is.number.neg0(toNumber(x));
        },

        pos0: function $pos0(x: unknown): boolean {
            return is.number(x) ? x >= 0 : is.number.pos0(toNumber(x));
        },

        zero: function $zero(x: unknown): boolean {
            return is.number(x) ? x === 0 : is.number.zero(toNumber(x));
        },

        even: function $even(x: unknown): boolean {
            return is.number(x) ? x % 2 === 0 : is.number.even(toNumber(x));
        },

        odd: function $odd(x: unknown): boolean {
            return is.number(x) ? x % 2 === 1 : is.number.odd(toNumber(x));
        },

        lt: function $lt(x: unknown, y: unknown): boolean {
            return (is.number(x) ? x : toNumber(x)) < (is.number(y) ? y : toNumber(y));
        },

        gt: function $gt(x: unknown, y: unknown): boolean {
            return (is.number(x) ? x : toNumber(x)) > (is.number(y) ? y : toNumber(y));
        },

        le: function $le(x: unknown, y: unknown): boolean {
            return (is.number(x) ? x : toNumber(x)) <= (is.number(y) ? y : toNumber(y));
        },

        ge: function $ge(x: unknown, y: unknown): boolean {
            return (is.number(x) ? x : toNumber(x)) >= (is.number(y) ? y : toNumber(y));
        },

        eq: function $eq(x: unknown, y: unknown): boolean {
            return (is.number(x) ? x : toNumber(x)) === (is.number(y) ? y : toNumber(y));
        },

        ne: function $eq(x: unknown, y: unknown): boolean {
            return (is.number(x) ? x : toNumber(x)) !== (is.number(y) ? y : toNumber(y));
        },

        bt: function $bt(x: unknown, min: unknown, max: unknown, range: Range = "[]"): boolean {
            return (range.charAt(0) === "(" ? is.number.gt(x, min) : is.number.ge(x, min)) && (range.charAt(0) === ")" ? is.number.lt(x, max) : is.number.le(x, max));
        },

        index: function $index(x: unknown): boolean {
            return is.number.safeInteger(x) && is.number.pos0(x);
        }
    }
);