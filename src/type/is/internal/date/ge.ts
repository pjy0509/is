import {DateLike, DateUnit, timeSymbol} from "../../../utils/types";
import {$get} from "../../../to/internal/date/get";

export function $ge(lhs: DateLike, rhs: DateLike, unit: DateUnit = timeSymbol): boolean {
    return $get(lhs, unit) >= $get(rhs, unit);
}