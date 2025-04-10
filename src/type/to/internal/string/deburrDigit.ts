import {deburrNumber} from "../../../utils/constant/deburrNumber";
import {$converter} from "./converter";

export function $deburrDigit(x: string): string {
    return $converter(x).replace(/[0-9]\ufe0f\u20e3|[0-9]\ufe0f|[\uff10-\uff19]|[\u2080-\u2089]|[\u2070\u00b9\u00b2\u00b3\u2074-\u2079]|\ud835[\udfce-\udfff]/g, c => deburrNumber[c] ?? c);
}