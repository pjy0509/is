export function $prototype(x: unknown): boolean {
    const constructor = x && x.constructor;
    const prototype = (typeof constructor === "function" && constructor.prototype) || Object.prototype;

    return x === prototype;
}