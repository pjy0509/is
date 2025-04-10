import {$map} from "../../../utils/function/map";
import {$words} from "./words";

export function $pascalCase(x: string): string {
    const words = $words(x);

    if (!words.length) {
        return "";
    }

    return $map(words, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join("");
}