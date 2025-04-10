import {DateLike} from "../../../utils/types";
import {$predicate as $date_predicate} from "./predicate";
import {$predicate as $number_predicate} from "../number/predicate";
import {$converter} from "../../../to/internal/date/converter";

export function $valid(x: DateLike): boolean {
    if ($date_predicate(x)) {
        return !isNaN(x.getDay());
    }

    if ($number_predicate(x)) {
        return x <= 8.64e15 && x >= -8.64e15;
    }

    return !isNaN($converter(x).getDay());
}