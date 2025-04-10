import {JSONValue} from "../../../utils/types";
import {$jsonArray} from "./jsonArray";
import {$jsonObject} from "./jsonObject";

export function $jsonValue(x: unknown): x is JSONValue | JSONValue[] | Record<string, JSONValue> {
    if (x instanceof String || x instanceof Number || x instanceof Boolean) {
        return true;
    }

    try {
        switch (typeof x) {
            case "object":
                return x === null || $jsonArray(x) || $jsonObject(x);
            case "string":
            case "number":
            case "boolean":
                return true;
            default:
                return false;
        }
    } catch {
        return false;
    }
}