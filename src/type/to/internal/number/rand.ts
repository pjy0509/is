import {$converter} from "./converter";

export function $rand(bound1?: number, bound2?: number): number {
    const rand = Math.random();

    if (bound1 === undefined) {
        return rand;
    }

    bound1 = $converter(bound1);

    if (bound2 === undefined) {
        return rand * bound1;
    }

    bound2 = $converter(bound2);

    if (bound1 === bound2) {
        return bound1;
    }

    if (bound1 > bound2) {
        return rand * (bound1 - bound2) + bound2;
    }

    return rand * (bound2 - bound1) + bound1;
}