import {Base} from "../../../utils/types";
import {$reduce} from "../../../utils/function/reduce";
import {$converter} from "../string/converter";

export function $radix(x: string, base: Base): number {
    x = $converter(x).toLowerCase();

    if (!x.includes(".")) {
        return parseInt(x, base);
    }

    const [integerPart, fractionalPart] = x.split(".");
    const integerValue = parseInt(integerPart, base);

    return integerValue + $reduce(fractionalPart.split(""), (sum, digit, index) => sum + parseInt(digit, base) / Math.pow(base, index + 1), 0);
}