import {DateLike} from "../../../utils/types";
import {$string} from "./string";

export function $rfc(x: DateLike = new Date()): string {
    return $string(x, "EEE, dd MMM yyyy HH:mm:ss ZZ");
}