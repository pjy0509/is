import {$rand} from "./rand";

export function $randInt(bound1?: number, bound2?: number): number {
    return Math.floor($rand(bound1, bound2));
}