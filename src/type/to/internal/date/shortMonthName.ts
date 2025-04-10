import {DateLike} from "../../../utils/types";
import {$predicate} from "../../../is/internal/date/predicate";
import {$converter} from "./converter";
import {monthNumberToShortString} from "../../../utils/function/monthNumberToShortString";

export function $shortMonthName(x: DateLike = new Date()): string {
    if (!$predicate(x)) {
        x = $converter(x);
    }

    return monthNumberToShortString(x.getMonth() + 1);
}