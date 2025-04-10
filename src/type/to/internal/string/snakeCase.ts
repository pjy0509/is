import {$filter} from "../../../utils/function/filter";
import {$map} from "../../../utils/function/map";
import {$words} from "./words";

export function $snakeCase(x: string): string {
    const words = $words(x);

    if (!words.length) {
        return "";
    }

    return $filter($map(words, word => word.toLowerCase()), word => !!word.length).join("_");
}