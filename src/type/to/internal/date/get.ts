import {DateLike, dateSymbol, DateUnit, hourSymbol, isoWeekSymbol, millisecondSymbol, minuteSymbol, monthSymbol, secondSymbol, timeSymbol, weekSymbol, yearSymbol} from "../../../utils/types";
import {$predicate} from "../../../is/internal/date/predicate";
import {$converter} from "./converter";
import {$isoWeek} from "./isoWeek";
import {$week} from "./week";

export function $get(x: DateLike, unit: DateUnit = timeSymbol): number {
    if (!$predicate(x)) {
        x = $converter(x);
    }

    switch (unit) {
        case yearSymbol:
            return x.getFullYear();
        case monthSymbol:
            return x.getMonth();
        case isoWeekSymbol:
            return $isoWeek(x);
        case weekSymbol:
            return $week(x);
        case dateSymbol:
            return x.getDate();
        case hourSymbol:
            return x.getHours();
        case minuteSymbol:
            return x.getMinutes();
        case secondSymbol:
            return x.getSeconds();
        case millisecondSymbol:
            return x.getMilliseconds();
        default:
            return x.getTime();
    }
}