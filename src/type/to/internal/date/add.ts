import {DateLike, dateSymbol, hourSymbol, isoWeekSymbol, millisecondSymbol, minuteSymbol, monthSymbol, secondSymbol, timeSymbol, weekSymbol, yearSymbol} from "../../../utils/types";
import {$converter} from "./converter";
import {$predicate} from "../../../is/internal/date/predicate";

export function $add(x: DateLike, ...units: any[]): Date {
    if (!$predicate(x)) {
        x = $converter(x);
    }

    for (const [n, unit] of units) {
        switch (unit) {
            case timeSymbol:
                x.setTime(x.getTime() + n);
                break;
            case yearSymbol:
                x.setFullYear(x.getFullYear() + n);
                break;
            case monthSymbol:
                x.setMonth(x.getMonth() + n);
                break;
            case weekSymbol:
            case isoWeekSymbol:
                x.setDate(x.getDate() + n * 7);
                break;
            case dateSymbol:
                x.setDate(x.getDate() + n);
                break;
            case hourSymbol:
                x.setHours(x.getHours() + n);
                break;
            case minuteSymbol:
                x.setMinutes(x.getMinutes() + n);
                break;
            case secondSymbol:
                x.setSeconds(x.getSeconds() + n);
                break;
            case millisecondSymbol:
                x.setMilliseconds(x.getMilliseconds() + n);
                break;
        }
    }

    return x as Date;
}