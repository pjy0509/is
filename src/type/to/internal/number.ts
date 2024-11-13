import {to} from "../core/to";

export interface NumberConverter {
    (x: unknown): number;

    clamp(x: number, bound1: number, bound2?: number): number;

    sum(...x: number[]): number;

    mean(...x: number[]): number;

    rand(bound1: number, bound2?: number): number;
}

export const $number: NumberConverter = Object.assign(
    function $number(x: unknown): number {
        return +(x as any);
    },
    {
        clamp: function $clamp(x: number, bound1: number, bound2?: number): number {
            if (!bound2) {
                return Math.min(x, bound1);
            }

            if (bound1 === bound2) {
                return bound1;
            }

            if (bound1 > bound2) {
                return Math.min(Math.max(x, bound2), bound1);
            }

            return Math.min(Math.max(x, bound1), bound2);
        },

        sum: function $sum(...x: number[]): number {
            let sum: number = 0;

            for (let i: number = 0; i < x.length; i++) {
                sum += x[i];
            }

            return sum;
        },

        mean: function $mean(...x: number[]): number {
            if (x.length === 0) {
                return Number.NaN;
            }

            if (x.length === 1) {
                return x[0];
            }

            if (x.length === 2) {
                return (x[0] + x[1]) / 2;
            }

            if (x.length === 3) {
                return (x[0] + x[1] + x[2]) / 3;
            }

            return to.number.sum(...x) / x.length;
        },

        rand: function $rand(bound1: number, bound2?: number): number {
            if (bound1 === bound2) {
                return bound1;
            }

            const rand: number = Math.random();

            if (!bound2) {
                return rand * bound1;
            }

            if (bound1 > bound2) {
                return rand * (bound1 - bound2) + bound2;
            }

            return rand * (bound2 - bound1) + bound1;
        }
    }
)