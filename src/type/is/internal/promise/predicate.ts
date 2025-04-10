export function $predicate(x: unknown): x is Promise<unknown> {
    return x instanceof Promise;
}