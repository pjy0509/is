export interface BigintPredicate {
    (x: unknown): x is bigint;
}

export const $bigint: BigintPredicate = Object.assign(
    function $bigint(x: unknown): x is bigint {
        return typeof x === "bigint";
    },
    {
    }
);