import {Truthy} from "../../../utils/types";

export function $compact<T>(x: ArrayLike<T>): Truthy<T>[] {
    const result = [];

    for (let i = 0; i < x.length; i++) {
        const item = x[i];

        if (item) {
            result.push(item as Truthy<T>);
        }
    }

    return result;
}