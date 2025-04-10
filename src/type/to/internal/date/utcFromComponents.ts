import {DateComponentArray, DateExtended, DateExtension} from "../../../utils/types";
import {$predicate} from "../../../is/internal/array/predicate";
import {$invalid} from "./invalid";
import {$valid} from "../../../is/internal/date/valid";

export function $utcFromComponents(year: number, month?: number, date?: number, hour?: number, minute?: number, second?: number, millisecond?: number): DateExtended;
export function $utcFromComponents(components: DateComponentArray): DateExtended;
export function $utcFromComponents(): DateExtended {
    const info: DateExtension = {source: [...arguments], valid: false};

    if (arguments.length === 0) {
        return Object.assign($invalid, info);
    }

    let [yearUnit, monthUnit, dateUnit, hourUnit, minuteUnit, secondUnit, millisecondUnit] = arguments;

    if ($predicate(yearUnit)) {
        [yearUnit, monthUnit, dateUnit, hourUnit, minuteUnit, secondUnit, millisecondUnit] = arguments[0];

        const date = $utcFromComponents(yearUnit, monthUnit ?? 1, dateUnit ?? 1, hourUnit ?? 0, minuteUnit ?? 0, secondUnit ?? 0, millisecondUnit ?? 0);

        date.source = arguments[0];

        return date;
    }

    if (yearUnit < 100 && yearUnit >= 0) {
        let date = $utcFromComponents(yearUnit + 400, monthUnit, dateUnit, hourUnit, minuteUnit, secondUnit, millisecondUnit);

        if (isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(yearUnit);
        }

        date.source = [...arguments];

        return date;
    }

    const date = new Date(Date.UTC(yearUnit, (monthUnit ?? 1) - 1, dateUnit ?? 1, hourUnit ?? 0, minuteUnit ?? 0, secondUnit ?? 0, millisecondUnit ?? 0));

    if (!$valid(date)) {
        return Object.assign(date, info);
    }

    info.source = [...arguments];
    info.format = "Components";
    info.valid = true;

    return Object.assign(date, info);
}