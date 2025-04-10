import {DateLike} from "../../../utils/types";
import {$predicate} from "../../../is/internal/date/predicate";
import {$converter} from "./converter";

export function $week(x: DateLike = new Date()): number {
    if (!$predicate(x)) {
        x = $converter(x);
    }

    const date = new Date(x.getTime());
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);

    return Math.ceil(((+date - +firstDayOfYear) / 86400000 + firstDayOfYear.getDay() + 1) / 7);
}