import {DateLike} from "../../../utils/types";
import {$predicate} from "../../../is/internal/date/predicate";
import {$converter} from "./converter";
import {dayNumberToString} from "../../../utils/function/dayNumberToString";

export function $dayName(x: DateLike = new Date()): string {
    if (!$predicate(x)) {
        x = $converter(x);
    }

    return dayNumberToString(x.getDay());
}