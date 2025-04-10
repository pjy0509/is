import {$converter} from "./converter";

export function $padStart(x: string, length: number, fill: string = " "): string {
    return $converter(x).padStart(length, fill);
}