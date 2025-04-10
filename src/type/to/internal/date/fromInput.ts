import {DateExtended, DateExtension} from "../../../utils/types";
import {$valid} from "../../../is/internal/date/valid";
import {$invalid} from "./invalid";

export function $fromInput(x: HTMLInputElement): DateExtended {
    const info: DateExtension = {source: x, valid: false};

    try {
        const type = x.type;
        const date = type === "date" || type === "time" || type === "week" || type === "month" ? x.valueAsDate : type === "datetime-local" ? new Date(x.value) : null;

        if (date) {
            if (!$valid(date)) {
                return Object.assign(date, info);
            }

            info.format = x.tagName + " type=\"" + type + "\"";
            info.valid = true;

            return Object.assign(date, info);
        }

        return Object.assign($invalid, info);
    } catch {
        return Object.assign($invalid, info);
    }
}