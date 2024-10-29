import {is} from "../core/is";
import {DateUnit, Range} from "../utils/types";
import {getUnit, toDate, toString} from "../utils/functions";

export interface DatePredicate {
    (x: unknown): x is Date;

    valid(x: unknown): boolean;

    leap(x: unknown): boolean;

    am(x: unknown): boolean;

    pm(x: unknown): boolean;

    lt(x: unknown, y: unknown, unit?: DateUnit): boolean;

    gt(x: unknown, y: unknown, unit?: DateUnit): boolean;

    le(x: unknown, y: unknown, unit?: DateUnit): boolean;

    ge(x: unknown, y: unknown, unit?: DateUnit): boolean;

    eq(x: unknown, y: unknown, unit?: DateUnit): boolean;

    ne(x: unknown, y: unknown, unit?: DateUnit): boolean;

    bt(x: unknown, min: unknown, max: unknown, unit?: DateUnit, range?: Range): boolean;
}

export const $date: DatePredicate = Object.assign(
    function $date(x: unknown): x is Date {
        return x instanceof Date;
    },
    {
        valid: function $valid(x: unknown): boolean {
            if (is.date(x)) return true;
            if (is.number(x)) return x <= 8.64e15 && x >= -8.64e15;

            return isNaN(new Date(toString(x)).getDay());
        },

        leap: function $leap(x: unknown): boolean {
            if (!is.date(x)) return is.date.leap(toDate(x));

            const year: number = x.getFullYear();

            return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
        },

        am: function $am(x: unknown): boolean {
            return is.date(x) ? x.getHours() < 12 : is.date.am(toDate(x));
        },

        pm: function $pm(x: unknown): boolean {
            return is.date(x) ? !is.date.am(x) : is.date.pm(toDate(x));
        },

        lt: function $lt(x: unknown, y: unknown, unit?: DateUnit): boolean {
            return getUnit(is.date(x) ? x : toDate(x), unit) < getUnit(is.date(y) ? y : toDate(y), unit);
        },

        gt: function $gt(x: unknown, y: unknown, unit?: DateUnit): boolean {
            return getUnit(is.date(x) ? x : toDate(x), unit) > getUnit(is.date(y) ? y : toDate(y), unit);
        },

        le: function $le(x: unknown, y: unknown, unit?: DateUnit): boolean {
            return getUnit(is.date(x) ? x : toDate(x), unit) <= getUnit(is.date(y) ? y : toDate(y), unit);
        },

        ge: function $ge(x: unknown, y: unknown, unit?: DateUnit): boolean {
            return getUnit(is.date(x) ? x : toDate(x), unit) >= getUnit(is.date(y) ? y : toDate(y), unit);
        },

        eq: function $eq(x: unknown, y: unknown, unit?: DateUnit): boolean {
            return getUnit(is.date(x) ? x : toDate(x), unit) === getUnit(is.date(y) ? y : toDate(y), unit);
        },

        ne: function $ne(x: unknown, y: unknown, unit?: DateUnit): boolean {
            return getUnit(is.date(x) ? x : toDate(x), unit) !== getUnit(is.date(y) ? y : toDate(y), unit);
        },

        bt: function $bt(x: unknown, min: unknown, max: unknown, unit?: DateUnit, range: Range = "[]"): boolean {
            return is.number.bt(getUnit(is.date(x) ? x : toDate(x), unit), getUnit(is.date(min) ? min : toDate(min), unit), getUnit(is.date(max) ? max : toDate(max), unit), range);
        }
    }
);