import {DateExtended, DateExtension} from "../../../utils/types";
import {rfc2822Regexp} from "../../../utils/constant/regExp";
import {$invalid} from "./invalid";
import {monthStringToNumber} from "../../../utils/function/monthStringToNumber";
import {dayStringToNumber} from "../../../utils/function/dayStringToNumber";
import {isOverflowDateComponents} from "../../../utils/function/isOverflowDateComponents";
import {calculateTimezoneDiff} from "../../../utils/function/calculateTimezoneDiff";
import {$utcFromComponents} from "./utcFromComponents";
import {$localFromComponents} from "./localFromComponents";
import {$valid} from "../../../is/internal/date/valid";

export function $fromRfc(x: string): DateExtended {
    const info: DateExtension = {source: x, valid: false};
    const group: { [K in string]: any } | null = x.match(rfc2822Regexp)?.groups ?? null;

    if (group === null) {
        return Object.assign($invalid, info);
    }

    if (group.year) {
        if (group.year <= 49) {
            group.year = 2000 + +group.year;
        }

        if (group.year <= 999) {
            group.year = 1900 + +group.year;
        }
    }

    if (group.month) {
        group.month = monthStringToNumber(group.month) - 1;
    }

    if (group.day) {
        group.day = dayStringToNumber(group.day);
    }

    // check mismatch day of week
    if (group.day && (new Date(group.year, group.month, group.date).getDay() || 7) !== group.day) {
        return Object.assign($invalid, info);
    }

    // check overflow
    if (isOverflowDateComponents(group)) {
        return Object.assign($invalid, info);
    }

    let date: Date;

    if (group.timezone) {
        const timezoneDiff = calculateTimezoneDiff(group.timezone);

        date = $utcFromComponents(group.year, group.month + 1, group.date, group.hour, group.minute, group.second, group.millisecond);

        if (timezoneDiff) {
            date.setUTCMinutes(date.getUTCMinutes() - timezoneDiff);
        }
    } else {
        date = $localFromComponents(group.year, group.month + 1, group.date, group.hour, group.minute, group.second, group.millisecond);
    }

    // check invalid js date
    if (!$valid(date)) {
        return Object.assign(date, info);
    }

    info.format = "RFC2822";
    info.valid = true;

    return Object.assign(date, info);
}