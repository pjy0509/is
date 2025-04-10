export function $primitive(x: unknown): x is null | undefined | string | number | boolean | symbol | bigint {
    return x == null || (typeof x !== "object" && typeof x !== "function");
}