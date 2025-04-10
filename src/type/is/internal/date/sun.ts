import {DateLike} from "../../../utils/types";
import {$predicate} from "./predicate";
import {$converter} from "../../../to/internal/date/converter";

export function $sun(x: DateLike): boolean {
    if (!$predicate(x)) {
        x = $converter(x);
    }

    return x.getDay() === 0;
}