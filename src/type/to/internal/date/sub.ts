import {DateLike, dateSymbol, DateUnit, hourSymbol, isoWeekSymbol, minuteSymbol, monthSymbol, secondSymbol, weekSymbol, yearSymbol} from "../../../utils/types";
import {$predicate} from "../../../is/internal/date/predicate";
import {$converter} from "./converter";

export function $sub(lhs: DateLike, rhs: DateLike, unit?: DateUnit): number {
    if (!$predicate(lhs)) {
        lhs = $converter(lhs);
    }

    if (!$predicate(rhs)) {
        rhs = $converter(rhs);
    }

    switch (unit) {
        case yearSymbol:
            return lhs.getFullYear() - rhs.getFullYear();
        case monthSymbol:
            return (lhs.getFullYear() - rhs.getFullYear()) * 12 + lhs.getMonth() - rhs.getMonth();
        case weekSymbol:
        case isoWeekSymbol:
            return Math.trunc((+lhs - +rhs) / 604800000)
        case dateSymbol:
            return Math.trunc((+lhs - +rhs) / 86400000);
        case hourSymbol:
            return Math.trunc((+lhs - +rhs) / 3600000);
        case minuteSymbol:
            return Math.trunc((+lhs - +rhs) / 60000);
        case secondSymbol:
            return Math.trunc((+lhs - +rhs) / 1000);
        default:
            return +lhs - +rhs;
    }
}