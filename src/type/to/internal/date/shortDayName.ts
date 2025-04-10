import {DateLike} from "../../../utils/types";
import {$predicate} from "../../../is/internal/date/predicate";
import {$converter} from "./converter";
import {dayNumberToShortString} from "../../../utils/function/dayNumberToShortString";

export function $shortDayName(x: DateLike = new Date()): string {
    if (!$predicate(x)) {
        x = $converter(x);
    }

    return dayNumberToShortString(x.getDay());
}