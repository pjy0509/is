import {$filter} from "../../../utils/function/filter";
import {$map} from "../../../utils/function/map";
import {$words} from "./words";

export function $titleCase(x: string): string {
    const words = $words(x);

    if (words.length === 0) {
        return "";
    }

    return $filter($map(words, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()), word => !!word.length).join(" ");
}