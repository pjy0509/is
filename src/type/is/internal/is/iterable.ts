export function $iterable<T, U = unknown>(x: U): x is U & Iterable<T> {
    if (typeof x === "string" || x instanceof String) {
        return true;
    }

    if (typeof x !== "object" || x === null || !(Symbol.iterator in x)) {
        return false;
    }

    if (typeof x[Symbol.iterator] !== "function") {
        return false;
    }

    const iterable = (x[Symbol.iterator] as Function)();

    if (iterable === undefined) {
        return false;
    }

    return "next" in iterable && typeof iterable.next === "function";
}