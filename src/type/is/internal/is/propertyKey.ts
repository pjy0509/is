export function $propertyKey(x: unknown): x is PropertyKey {
    const type = typeof x;

    return type === "string" || type === "number" || type === "symbol";
}