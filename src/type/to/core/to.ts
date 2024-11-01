import {Constructor, PrimitiveType, PrimitiveTypeKey} from "../../utils/types";
import {$string, StringConverter} from "../internal/string";

export interface Converter {
    <T extends PrimitiveTypeKey>(x: unknown, type: T): x is PrimitiveType<T>;

    <T>(x: unknown, type: Constructor<T>): x is T;

    string: StringConverter
}

export const to: Converter = Object.assign(
    function $to<T>(x: unknown, type: any): x is T {
        if (typeof type === "string") return typeof x === type;
        if (typeof type === "undefined") return false;

        return x instanceof type;
    },
    {
        string: $string,
    }
);