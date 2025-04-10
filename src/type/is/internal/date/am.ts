import {DateLike} from "../../../utils/types";
import {$converter} from "../../../to/internal/date/converter";

export function $am(x: DateLike): boolean {
    return $converter(x).getHours() < 12;
}