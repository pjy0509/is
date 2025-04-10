import {DateComponents, DateLike} from "../../../utils/types";
import {$predicate} from "../../../is/internal/date/predicate";
import {$converter} from "./converter";
import {$isoWeek} from "./isoWeek";
import {$week} from "./week";
import {monthNumberToString} from "../../../utils/function/monthNumberToString";
import {monthNumberToShortString} from "../../../utils/function/monthNumberToShortString";
import {dayNumberToString} from "../../../utils/function/dayNumberToString";
import {dayNumberToShortString} from "../../../utils/function/dayNumberToShortString";
import {$ordinal} from "../number/ordinal";

export function $components(x: DateLike = new Date()): DateComponents {
    if (!$predicate(x)) {
        x = $converter(x);
    }

    const year = x.getFullYear();
    const century = Math.floor(year / 100) + 1;
    const month = x.getMonth() + 1;
    const date = x.getDate();
    const quarter = Math.ceil(month / 4) + 1;
    const day = x.getDay();
    const isoDay = day || 7;
    const startOfYear = new Date(year, 0, 1);
    const dayOfYear = Math.floor((+x - +startOfYear) / 86400000) + 1;
    const hour = x.getHours();
    const minute = x.getMinutes();
    const second = x.getSeconds();
    const millisecond = x.getMilliseconds();
    const time = x.getTime();
    const offset = x.getTimezoneOffset();
    const isoWeek = $isoWeek(x);
    const week = $week(x);

    const absOffset = Math.abs(offset);
    const offsetSign = offset > 0 ? "-" : "+";
    const offsetHour = (Math.floor(absOffset / 60) + "").padStart(2, "0");
    const offsetMinute = ((absOffset % 60) + "").padStart(2, "0");

    return {
        century,
        year,
        quarter,
        month,
        date,
        day,
        isoDay,
        week,
        isoWeek,
        dayOfYear,
        hour,
        minute,
        second,
        millisecond,
        time,
        offset,
        format: {
            yyyyo: $ordinal(year),
            yyyy: year + "",
            yyo: $ordinal(+((year + "").slice(-2))),
            yy: (year + "").slice(-2),
            Qo: $ordinal(quarter),
            Q: (quarter + ""),
            MMMM: monthNumberToString(month),
            MMM: monthNumberToShortString(month),
            MM: (month + "").padStart(2, "0"),
            Mo: $ordinal(month),
            M: (month + ""),
            DD: (dayOfYear + "").padStart(3, "0"),
            Do: $ordinal(dayOfYear),
            D: (dayOfYear + ""),
            dd: (date + "").padStart(2, "0"),
            do: $ordinal(date),
            d: (date + ""),
            HH: (hour + "").padStart(2, "0"),
            Ho: $ordinal(hour),
            H: (hour + ""),
            hh: (((hour % 12) || 12) + "").padStart(2, '0'),
            ho: $ordinal((hour % 12) || 12),
            h: (((hour % 12) || 12) + ""),
            mm: (minute + "").padStart(2, "0"),
            mo: $ordinal(minute),
            m: (minute + ""),
            SSS: (millisecond + "").padStart(3, "0"),
            ss: (second + "").padStart(2, "0"),
            so: $ordinal(second),
            s: (second + ""),
            A: hour < 12 ? 'AM' : 'PM',
            a: hour < 12 ? 'am' : 'pm',
            ZZ: offsetSign + offsetHour + offsetMinute,
            Z: offsetSign + offsetHour + ":" + offsetMinute,
            EEEE: dayNumberToString(day),
            EEE: dayNumberToShortString(day),
            X: (time / 1000).toFixed(3),
            x: (time + ""),
            WW: (isoWeek + "").padStart(2, '0'),
            Wo: $ordinal(isoWeek),
            W: (isoWeek + ""),
            ww: (week + "").padStart(2, '0'),
            wo: $ordinal(week),
            w: (week + ""),
            Eo: $ordinal(isoDay),
            E: (isoDay + ""),
            eo: $ordinal(day),
            e: (day + ""),
            N: year > 0 ? "Anno Domini" : "Before Christ",
            n: year > 0 ? "AD" : "BC",
        }
    }
}