import {$jsonValue} from "./jsonValue";
import {JSONValue} from "../../../utils/types";

export function $jsonArray(x: unknown): x is JSONValue[] {
    if (Array.isArray(x)) {
        return x.every(element => $jsonValue(element));
    }

    return false;
}