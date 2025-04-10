import {htmlUnescapes} from "../../../utils/constant/htmlUnescape";
import {$converter} from "./converter";

export function $unescapeHTML(x: string): string {
    return $converter(x).replace(/&(?:amp|lt|gt|quot|#(0+)?39);/g, m => htmlUnescapes[m] || "'");
}