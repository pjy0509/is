import {$map} from "../../../utils/function/map";
import {$words} from "./words";

export function $camelCase(x: string): string {
    const words = $words(x);

    if (!words.length) {
        return "";
    }

    const [first, ...rest] = words;

    return first.toLowerCase() + $map(rest, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
}