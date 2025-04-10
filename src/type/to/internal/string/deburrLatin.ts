import {deburrLatin} from "../../../utils/constant/deburrLatin";
import {$converter} from "./converter";

export function $deburrLatin(x: string): string {
    x = $converter(x).normalize("NFD");

    let result = "";

    for (let i = 0; i < x.length; i++) {
        const c = x[i];

        if ((c >= "\u0300" && c <= "\u036f") || (c >= "\ufe20" && c <= "\ufe23")) {
            continue;
        }

        result += deburrLatin[c] ?? c;
    }

    return result;
}