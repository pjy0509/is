export function $predicate(x: unknown): x is symbol {
    return typeof x === "symbol";
}