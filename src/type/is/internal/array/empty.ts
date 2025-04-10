export function $empty<T>(x: ArrayLike<T>): boolean {
    return "length" in x && !x.length;
}