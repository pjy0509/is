import {DateLike} from "../../../utils/types";
import {$predicate} from "../../../is/internal/date/predicate";
import {$converter} from "./converter";

export function $isoWeek(x: DateLike = new Date()): number {
    if (!$predicate(x)) {
        x = $converter(x);
    }

    const date = new Date(x.getTime());

    date.setDate(date.getDate() + 4 - (date.getDay() || 7));

    const weekStart = new Date(new Date(date.getFullYear(), 0, 1).getTime());

    weekStart.setDate(weekStart.getDate() + 4 - (weekStart.getDay() || 7));

    return Math.ceil(((+date - +weekStart) / 86400000 + 1) / 7);
}