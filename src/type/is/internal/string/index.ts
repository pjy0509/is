import {$index as $number_index} from "../number/index";

export function $index(x: string): boolean {
    return /^(?:0|[1-9]\d*)$/.test(x) && $number_index(+x);
}