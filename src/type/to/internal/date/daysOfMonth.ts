import {DateLike} from "../../../utils/types";
import {$predicate} from "../../../is/internal/date/predicate";
import {$converter} from "./converter";
import {$leap} from "../../../is/internal/date/leap";

export function $daysOfMonth(x: DateLike): number {
    if (!$predicate(x)) {
        x = $converter(x);
    }

    let month = x.getMonth();
    return month === 1 ? $leap(x) ? 29 : 28 : 31 - ((month % 7) % 2);
}