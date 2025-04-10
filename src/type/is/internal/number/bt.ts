import {Range} from "../../../utils/types";

export function $bt(x: number, min: number, max: number, range: Range = "[]"): boolean {
    return (range[0] === "(" ? x > min : x >= min) && (range[1] === ")" ? x < max : x <= max);
}