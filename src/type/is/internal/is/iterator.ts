export function $iterator<T>(x: unknown): x is Iterator<T> {
    return x instanceof ""[Symbol.iterator]().constructor;
}