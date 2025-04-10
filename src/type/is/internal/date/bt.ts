import {DateLike, DateUnit, Range, timeSymbol} from "../../../utils/types";
import {$bt as $number_bt} from "../number/bt"
import {$get} from "../../../to/internal/date/get";

export function $bt(x: DateLike, min: DateLike, max: DateLike, range: Range = "[]", unit: DateUnit = timeSymbol): boolean {
    return $number_bt($get(x, unit), $get(min, unit), $get(max, unit), range);
}