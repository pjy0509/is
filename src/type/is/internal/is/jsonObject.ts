import {JSONValue} from "../../../utils/types";
import {$jsonValue} from "./jsonValue";
import {$plain} from "../object/plain";

export function $jsonObject(x: unknown): x is Record<string, JSONValue> {
    if ($plain(x)) {
        return Reflect.ownKeys(x as any).every(key => typeof key === "string" && $jsonValue(x[key]));
    }

    return false;
}