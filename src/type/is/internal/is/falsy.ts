import {Falsy} from "../../../utils/types";

export function $falsy(x: unknown): x is Falsy {
    return x == null || x === false || x === 0 || x === -0 || (typeof BigInt === "function" && x === BigInt(0)) || isNaN(x as number) || x === "";
}