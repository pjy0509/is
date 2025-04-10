import {DateExtended, DateExtension} from "../../../utils/types";
import {aspDotNetJsonDateRegexp} from "../../../utils/constant/regExp";
import {$valid} from "../../../is/internal/date/valid";
import {$invalid} from "./invalid";

export function $fromAspDotNetJson(x: string): DateExtended {
    const info: DateExtension = {source: x, valid: false};
    const group: { [K in string]: any } | null = x.match(aspDotNetJsonDateRegexp)?.groups ?? null;

    if (group === null) {
        return Object.assign($invalid, info);
    }

    if (group.time) {
        const timestamp = +group.time;

        // check overflow
        if (timestamp > 8.64e15 || timestamp < -8.64e15) {
            return Object.assign($invalid, info);
        }

        const date = new Date(timestamp);

        // check invalid js date
        if (!$valid(date)) {
            return Object.assign(date, info);
        }

        info.format = "ASP.NET JSON Date";
        info.valid = true;

        return Object.assign(date, info);
    }

    return Object.assign($invalid, info);
}