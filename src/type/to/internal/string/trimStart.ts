import {$map} from "../../../utils/function/map";
import {$converter} from "./converter";

export function $trimStart(x: string, ...chars: string[]): string {
    x = $converter(x);

    let i = 0;

    switch (chars.length) {
        case 0:
            return x.trimEnd();
        case 1:
            while (i < x.length && x[i] === $converter(chars[0])) i++;
            break;
        case 2:
            while (i < x.length && (x[i] === $converter(chars[0]) || x[i] === $converter(chars[1]))) i++;
            break;
        case 3:
            while (i < x.length && (x[i] === $converter(chars[0]) || x[i] === $converter(chars[1]) || x[i] === $converter(chars[2]))) i++;
            break;
        default:
            chars = $map(chars, $converter);

            while (i < x.length && chars.includes(x[i])) i++;
    }

    return x.substring(i);
}