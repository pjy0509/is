export function $argument(x: unknown): x is IArguments {
    return typeof x === "object" && x !== null && "callee" in x && !Object.prototype.propertyIsEnumerable.call(x, "callee");
}