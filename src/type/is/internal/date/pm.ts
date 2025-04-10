import {DateLike} from "../../../utils/types";
import {$am} from "./am";
import {$converter} from "../../../to/internal/date/converter";

export function $pm(x: DateLike): boolean {
    return !$am($converter(x));
}