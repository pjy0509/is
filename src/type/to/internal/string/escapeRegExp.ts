import {$converter} from "./converter";

export function $escapeRegExp(x: string): string {
    return $converter(x).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}