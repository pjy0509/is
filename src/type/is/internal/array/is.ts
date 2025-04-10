import {$every} from "../../../utils/function/every";
import {$predicate} from "../is/is";

export function $is<T>(x: unknown[], type: any): x is T[] {
    return $every(x, element => $predicate(element, type));
}