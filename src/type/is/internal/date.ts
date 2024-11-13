import {is} from "../core/is";
import {DateUnit, Range} from "../../utils/types";
import {getUnit, toDate} from "../../utils/functions";
import to from "../../to/index";

type DateLike = number | string | Date;

export interface DatePredicate {
    (x: unknown): x is Date;

    valid(x: DateLike): boolean;

    leap(x: DateLike): boolean;

    am(x: DateLike): boolean;

    pm(x: DateLike): boolean;

    lt(x: DateLike, y: DateLike, unit?: DateUnit): boolean;

    gt(x: DateLike, y: DateLike, unit?: DateUnit): boolean;

    le(x: DateLike, y: DateLike, unit?: DateUnit): boolean;

    ge(x: DateLike, y: DateLike, unit?: DateUnit): boolean;

    eq(x: DateLike, y: DateLike, unit?: DateUnit): boolean;

    ne(x: DateLike, y: DateLike, unit?: DateUnit): boolean;

    bt(x: DateLike, min: DateLike, max: DateLike, range?: Range, unit?: DateUnit): boolean;
}

export const $date: DatePredicate = Object.assign(
    function $date(x: unknown): x is Date {
        return x instanceof Date;
    },
    {
        valid: function $valid(x: DateLike): boolean {
            if (is.date(x)) {
                return true;
            }

            if (is.number(x)) {
                return x <= 8.64e15 && x >= -8.64e15;
            }

            return isNaN(new Date(to.string(x)).getDay());
        },

        leap: function $leap(x: DateLike): boolean {
            if (!is.date(x)) {
                return is.date.leap(toDate(x));
            }

            const year: number = x.getFullYear();

            return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
        },

        am: function $am(x: DateLike): boolean {
            return is.date(x) ? x.getHours() < 12 : is.date.am(toDate(x));
        },

        pm: function $pm(x: DateLike): boolean {
            return is.date(x) ? !is.date.am(x) : is.date.pm(toDate(x));
        },

        lt: function $lt(x: DateLike, y: DateLike, unit?: DateUnit): boolean {
            return getUnit(is.date(x) ? x : toDate(x), unit) < getUnit(is.date(y) ? y : toDate(y), unit);
        },

        gt: function $gt(x: DateLike, y: DateLike, unit?: DateUnit): boolean {
            return getUnit(is.date(x) ? x : toDate(x), unit) > getUnit(is.date(y) ? y : toDate(y), unit);
        },

        le: function $le(x: DateLike, y: DateLike, unit?: DateUnit): boolean {
            return getUnit(is.date(x) ? x : toDate(x), unit) <= getUnit(is.date(y) ? y : toDate(y), unit);
        },

        ge: function $ge(x: DateLike, y: DateLike, unit?: DateUnit): boolean {
            return getUnit(is.date(x) ? x : toDate(x), unit) >= getUnit(is.date(y) ? y : toDate(y), unit);
        },

        eq: function $eq(x: DateLike, y: DateLike, unit?: DateUnit): boolean {
            return getUnit(is.date(x) ? x : toDate(x), unit) === getUnit(is.date(y) ? y : toDate(y), unit);
        },

        ne: function $ne(x: DateLike, y: DateLike, unit?: DateUnit): boolean {
            return getUnit(is.date(x) ? x : toDate(x), unit) !== getUnit(is.date(y) ? y : toDate(y), unit);
        },

        bt: function $bt(x: DateLike, min: DateLike, max: DateLike, range: Range = "[]", unit?: DateUnit): boolean {
            return is.number.bt(getUnit(is.date(x) ? x : toDate(x), unit), getUnit(is.date(min) ? min : toDate(min), unit), getUnit(is.date(max) ? max : toDate(max), unit), range);
        }
    }
);