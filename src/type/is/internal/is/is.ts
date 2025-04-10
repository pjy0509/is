export function $predicate<T>(x: unknown, type: any): x is T {
    if (type === "constructor") {
        if (typeof x !== 'function') {
            return false;
        }

        try {
            Reflect.construct(String, [], x);
            const descriptor = Object.getOwnPropertyDescriptor(x, "prototype");
            return !(!descriptor || descriptor.writable);
        } catch (e) {
            return false;
        }
    }

    if (type === "object") {
        return typeof x === "object" && x !== null;
    }

    if (typeof type === "string") {
        return typeof x === type;
    }

    if (typeof type === "undefined") {
        return false;
    }

    return x instanceof type;
}