import {DateLike} from "../../../utils/types";
import {$predicate} from "../../../is/internal/date/predicate";
import {$converter} from "./converter";
import {$valid} from "../../../is/internal/date/valid";
import {$components} from "./components";

export function $string(x: DateLike = new Date(), format?: string): string {
    if (!$predicate(x)) {
        x = $converter(x);
    }

    if (!$valid(x)) {
        return "Invalid Date";
    }

    if (!format) {
        return x.toString();
    }

    const parts = format.split(/('.*?')/);
    const formats: Record<string, string> = $components(x).format;

    return parts.map(part => {
        if (/^'.*'$/.test(part)) {
            return part.slice(1, -1);
        } else {
            return part.replace(/yyyyo|yyyy|yyo|yy|Qo|Q|MMMM|MMM|MM|Mo|M|DD|Do|D|dd|do|d|HH|Ho|H|hh|ho|h|mm|mo|m|SSS|ss|so|s|A|a|ZZ|Z|EEEE|EEE|X|x|WW|Wo|W|ww|wo|w|Eo|E|eo|e|N|n/g, m => formats[m] ?? m);
        }
    }).join('');
}