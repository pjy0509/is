import {DateLike} from "../../../utils/types";
import {$string} from "./string";

export function $iso(x: DateLike = new Date()): string {
    return $string(x, "yyyy-MM-dd'T'HH:mm:ss.SSSZ");
}