import {DateExtended, DateExtension} from "../../../utils/types";
import {$invalid} from "./invalid";
import {$intersection} from "../array/intersection";
import {isOverflowDateComponents} from "../../../utils/function/isOverflowDateComponents";
import {$localFromComponents} from "./localFromComponents";

export function $fromObject(x: Record<string, any>): DateExtended {
    const info: DateExtension = {source: x, valid: false};

    if ($intersection(Object.keys(x), ["years", "year", "y", "months", "month", "M", "days", "day", "d", "dates", "date", "D", "hours", "hour", "h", "minutes", "minute", "m", "seconds", "second", "s", "milliseconds", "millisecond", "ms"]).length > 0) {

        x.year = x.years !== undefined ? x.years : x.year !== undefined ? x.year : x.y !== undefined ? x.y : 0;
        x.month = (x.months !== undefined ? x.months : x.month !== undefined ? x.month : x.M !== undefined ? x.M : 1) - 1;
        x.date = x.dates !== undefined ? x.dates : x.date !== undefined ? x.date : x.d !== undefined ? x.d : 1;
        x.hour = x.hours !== undefined ? x.hours : x.hour !== undefined ? x.hour : x.h !== undefined ? x.h : 0;
        x.minute = x.minutes !== undefined ? x.minutes : x.minute !== undefined ? x.minute : x.m !== undefined ? x.m : 0;
        x.second = x.seconds !== undefined ? x.seconds : x.second !== undefined ? x.second : x.s !== undefined ? x.s : 0;
        x.millisecond = x.milliseconds !== undefined ? x.milliseconds : x.millisecond !== undefined ? x.millisecond : x.ms !== undefined ? x.ms : 0;

        if (isOverflowDateComponents(x)) {
            return Object.assign($invalid, info);
        }

        info.format = "Object";
        info.valid = true;

        return Object.assign($localFromComponents(x.year, x.month + 1, x.date, x.hour, x.minute, x.second, x.millisecond), info);
    }

    return Object.assign($invalid, info);
}