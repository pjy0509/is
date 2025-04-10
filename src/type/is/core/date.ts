import {DateLike, DateUnit, Range} from "../../utils/types";
import {$predicate} from "../internal/date/predicate";
import {$unit} from "../internal/date/unit";
import {$valid} from "../internal/date/valid";
import {$leap} from "../internal/date/leap";
import {$am} from "../internal/date/am";
import {$pm} from "../internal/date/pm";
import {$sun} from "../internal/date/sun";
import {$mon} from "../internal/date/mon";
import {$tue} from "../internal/date/tue";
import {$wed} from "../internal/date/wed";
import {$thu} from "../internal/date/thu";
import {$fri} from "../internal/date/fri";
import {$sat} from "../internal/date/sat";
import {$lt} from "../internal/date/lt";
import {$gt} from "../internal/date/gt";
import {$le} from "../internal/date/le";
import {$ge} from "../internal/date/ge";
import {$eq} from "../internal/date/eq";
import {$ne} from "../internal/date/ne";
import {$bt} from "../internal/date/bt";

export interface DatePredicate {
    (x: unknown): x is Date;

    unit: {
        readonly time: DateUnit;
        readonly year: DateUnit;
        readonly month: DateUnit;
        readonly week: DateUnit;
        readonly isoWeek: DateUnit;
        readonly date: DateUnit;
        readonly hour: DateUnit;
        readonly minute: DateUnit;
        readonly second: DateUnit;
        readonly millisecond: DateUnit;
    }

    valid(x: DateLike): boolean;

    leap(x: DateLike): boolean;

    am(x: DateLike): boolean;

    pm(x: DateLike): boolean;

    sun(x: DateLike): boolean;

    mon(x: DateLike): boolean;

    tue(x: DateLike): boolean;

    wed(x: DateLike): boolean;

    thu(x: DateLike): boolean;

    fri(x: DateLike): boolean;

    sat(x: DateLike): boolean;

    lt(lhs: DateLike, rhs: DateLike, unit?: DateUnit): boolean;

    gt(lhs: DateLike, rhs: DateLike, unit?: DateUnit): boolean;

    le(lhs: DateLike, rhs: DateLike, unit?: DateUnit): boolean;

    ge(lhs: DateLike, rhs: DateLike, unit?: DateUnit): boolean;

    eq(lhs: DateLike, rhs: DateLike, unit?: DateUnit): boolean;

    ne(lhs: DateLike, rhs: DateLike, unit?: DateUnit): boolean;

    bt(x: DateLike, min: DateLike, max: DateLike, range?: Range, unit?: DateUnit): boolean;
}

export const $date: DatePredicate = Object.assign(
    $predicate,
    {
        unit: $unit,
        valid: $valid,
        leap: $leap,
        am: $am,
        pm: $pm,
        sun: $sun,
        mon: $mon,
        tue: $tue,
        wed: $wed,
        thu: $thu,
        fri: $fri,
        sat: $sat,
        lt: $lt,
        gt: $gt,
        le: $le,
        ge: $ge,
        eq: $eq,
        ne: $ne,
        bt: $bt
    }
);