import {is} from "../core/is";
import {toBoolean} from "../utils/functions";

export interface BooleanPredicate {
    (x: unknown): x is boolean;

    true(x: unknown): boolean;

    false(x: unknown): boolean;
}

export const $boolean: BooleanPredicate = Object.assign(
    function $boolean(x: unknown): x is boolean {
        return is(x, "boolean");
    },
    {
        true: function $true(x: unknown): boolean {
            return is.boolean(x) ? x : is.boolean.true(toBoolean(x));
        },

        false: function $false(x: unknown): boolean {
            return is.boolean(x) ? !x : is.boolean.false(toBoolean(x));
        }
    }
);