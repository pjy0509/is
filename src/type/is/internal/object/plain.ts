export function $plain(x: unknown): x is Record<PropertyKey, any> {
    if (x === null || typeof x !== "object") {
        return false;
    }

    const proto = Object.getPrototypeOf(x);

    return (proto === null || Object.getPrototypeOf(proto) === null || proto === Object.prototype) && Object.prototype.toString.call(x) === "[object Object]";
}