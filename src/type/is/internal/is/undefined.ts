export function $undefined(x: unknown): x is undefined {
    return x === undefined;
}