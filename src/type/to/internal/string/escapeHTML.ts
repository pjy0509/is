import {htmlEscape} from "../../../utils/constant/htmlEscape";
import {$converter} from "./converter";

export function $escapeHTML(x: string): string {
    return $converter(x).replace(/[&<>"']/g, m => htmlEscape[m]);
}