import {$converter} from "./converter";

export function $clamp(x: number, bound1?: number, bound2?: number): number {
    x = $converter(x);

    if (bound1 === undefined) {
        return x;
    }

    bound1 = $converter(bound1);

    if (bound2 === undefined) {
        return Math.min(x, bound1);
    }

    bound2 = $converter(bound2);

    if (bound1 === bound2) {
        return bound1;
    }

    if (bound1 > bound2) {
        return Math.min(Math.max(x, bound2), bound1);
    }

    return Math.min(Math.max(x, bound1), bound2);
}