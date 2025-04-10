import {DateExtended, DateExtension} from "../../../utils/types";
import {basicIso8601Regexp, extendedIso8601Regexp} from "../../../utils/constant/regExp";
import {$invalid} from "./invalid";
import {isOverflowDateComponents} from "../../../utils/function/isOverflowDateComponents";
import {calculateTimezoneDiff} from "../../../utils/function/calculateTimezoneDiff";
import {$utcFromComponents} from "./utcFromComponents";
import {$valid} from "../../../is/internal/date/valid";
import {$localFromComponents} from "./localFromComponents";

export function $fromIso(x: string): DateExtended {
    const info: DateExtension = {source: x, valid: false};
    const group: { [K in string]: any } | null = (x.match(extendedIso8601Regexp) ?? x.match(basicIso8601Regexp))?.groups ?? null;

    if (group === null) {
        return Object.assign($invalid, info);
    }

    // check invalid format
    if (group.hour !== undefined && ((group.month !== undefined && group.date === undefined) || (group.week !== undefined && group.day === undefined))) {
        return Object.assign($invalid, info);
    }

    if (group.month) {
        group.month -= 1;
    }

    if (group.day === undefined) {
        group.day = 1;
    }

    // check overflow
    if (isOverflowDateComponents(group)) {
        return Object.assign($invalid, info);
    }

    let date: Date;
    let [yearUnit, monthUnit, dateUnit] = [group.year, group.month, group.date];

    if (group.week) {
        const isoWeekStart = new Date(Date.UTC(group.year, 0, 4 - ((new Date(Date.UTC(group.year, 0, 4)).getUTCDay() || 7) - 1)));

        [yearUnit, monthUnit, dateUnit] = [isoWeekStart.getUTCFullYear(), isoWeekStart.getUTCMonth(), isoWeekStart.getUTCDate() + (group.week - 1) * 7 + (group.day - 1)];
    }

    if (group.dayOfYear) {
        dateUnit = group.dayOfYear;
    }

    if (group.timezone) {
        const timezoneDiff = calculateTimezoneDiff(group.timezone);

        date = $utcFromComponents(yearUnit, monthUnit + 1, dateUnit, group.hour, group.minute, group.second, group.millisecond);

        if (timezoneDiff) {
            date.setUTCMinutes(date.getUTCMinutes() - timezoneDiff);
        }
    } else {
        date = $localFromComponents(yearUnit, monthUnit + 1, dateUnit, group.hour, group.minute, group.second, group.millisecond);
    }

    // check invalid js date
    if (!$valid(date)) {
        return Object.assign(date, info);
    }

    info.format = "ISO8601";
    info.valid = true;

    return Object.assign(date, info);
}