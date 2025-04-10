import {DateLike} from "../../../utils/types";
import {$predicate} from "../../../is/internal/date/predicate";
import {$converter} from "./converter";
import {monthNumberToString} from "../../../utils/function/monthNumberToString";

export function $monthName(x: DateLike = new Date()): string {
    if (!$predicate(x)) {
        x = $converter(x);
    }

    return monthNumberToString(x.getMonth() + 1);
}