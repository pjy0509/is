import {$deburrDigit} from "./deburrDigit";
import {$deburrLatin} from "./deburrLatin";

export function $deburr(x: string): string {
    return $deburrLatin($deburrDigit(x));
}