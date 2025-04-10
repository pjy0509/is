import {DateLike} from "../../../utils/types";
import {$converter} from "../../../to/internal/date/converter";

export function $leap(x: DateLike): boolean {
    const year = $converter(x).getFullYear();

    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}