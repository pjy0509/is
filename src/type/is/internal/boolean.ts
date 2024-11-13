import {is} from "../core/is";

export interface BooleanPredicate {
    (x: unknown): x is boolean;

    true(x: boolean): boolean;

    false(x: boolean): boolean;
}

export const $boolean: BooleanPredicate = Object.assign(
    function $boolean(x: unknown): x is boolean {
        return is(x, "boolean");
    },
    {
        true: function $true(x: boolean): boolean {
            return x;
        },

        false: function $false(x: boolean): boolean {
            return !x;
        }
    }
);