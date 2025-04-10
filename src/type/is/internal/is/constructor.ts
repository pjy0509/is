import {Constructor} from "../../../utils/types";

export function $constructor(x: unknown): x is Constructor<any> {
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