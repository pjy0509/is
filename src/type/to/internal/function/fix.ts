import {RemainingParameters, Unfixed} from "../../../utils/types";
import {apply} from "../../../utils/function/apply";
import {$unfixed} from "./unfixed";

export function $fix<T extends (...args: any[]) => any, F extends { [K in keyof F]: K extends keyof Parameters<T> ? Parameters<T>[K] | Unfixed : number extends Parameters<T>["length"] ? Parameters<T>[Parameters<T>["length"]] | Unfixed : never }>(x: T, ...args: F extends any[] ? F : never): (...args: RemainingParameters<T, F extends any[] ? F : never>) => ReturnType<T> {
    const fixed = Array.prototype.slice.call(args);

    return function (this: unknown, ...args: any[]) {
        const merged = [];
        for (let i = 0, j = 0; i < fixed.length || j < args.length; i++) {
            if (fixed[i] === $unfixed || i >= fixed.length) {
                merged.push(args[j++]);
            } else {
                merged.push(fixed[i]);
            }
        }

        return apply(this, x, merged);
    }
}