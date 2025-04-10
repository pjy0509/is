import {DateExtended, DateExtension} from "../../../utils/types";
import {$valid} from "../../../is/internal/date/valid";
import {$invalid} from "./invalid";

export function $fromNumber(x: number): DateExtended {
    const info: DateExtension = {source: x, valid: false};

    if (x > 8.64e15 || x < -8.64e15) {
        return Object.assign($invalid, info);
    }

    const date = new Date(x);

    if (!$valid(date)) {
        return Object.assign(date, info);
    }

    info.format = "Number";
    info.valid = true;

    return Object.assign(date, info);
}