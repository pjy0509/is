import {$map} from "../../../utils/function/map";
import {$converter} from "./converter";

export function $trimEnd(x: string, ...chars: string[]): string {
    x = $converter(x);

    let i = x.length;

    switch (chars.length) {
        case 0:
            return x.trimEnd();
        case 1:
            while (i > 0 && x[i - 1] === $converter(chars[0])) i--;
            break;
        case 2:
            while (i > 0 && (x[i - 1] === $converter(chars[0]) || x[i - 1] === $converter(chars[1]))) i--;
            break;
        case 3:
            while (i > 0 && (x[i - 1] === $converter(chars[0]) || x[i - 1] === $converter(chars[1]) || x[i - 1] === $converter(chars[2]))) i--;
            break;
        default:
            chars = $map(chars, $converter);

            while (i > 0 && chars.includes(x[i - 1])) i--;
    }

    return x.substring(0, i);
}