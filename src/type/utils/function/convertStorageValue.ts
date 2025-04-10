import {$constructor} from "../../is/internal/is/constructor";

export function convertStorageValue(x: string | number | boolean | object | null, as: any): any {
    if (x === null) {
        return null;
    }

    if (as === "string") {
        return x;
    }

    if (as === "number") {
        x = +x;

        if (isNaN(x)) {
            return null;
        }

        return x;
    }

    if (as === "boolean") {
        return x === "false" ? false : !!x;
    }

    if (as === "object") {
        try {
            const value = JSON.parse(x as string);

            if (typeof value === "object") {
                return value;
            }

            return null;
        } catch {
            return null;
        }
    }

    if ($constructor(as)) {
        const container = new as();
        const object = convertStorageValue(x, "object") as Record<string, any>;

        if (object === null) {
            return null;
        }

        for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(container))) {
            try {
                Object.defineProperty(container, key, {...descriptor, value: object[key]});
            } catch {}
        }

        return container;
    }

    return null;
}