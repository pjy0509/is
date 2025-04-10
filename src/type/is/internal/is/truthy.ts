import {Truthy} from "../../../utils/types";

export function $truthy<T = unknown>(x: T): x is Truthy<T> {
    return x != null && x !== false && x !== 0 && x !== -0 && (typeof BigInt !== "function" || x !== BigInt(0)) && !isNaN(x as number) && x !== "";
}