import {PathRecord} from "../../../utils/types";
import {$predicate} from "./is";

export function $in<T, Key extends PropertyKey, U>(x: T, propertyKeys: Key, type?: any): x is T & PathRecord<Key, U> {
    let current: any = x;

    if (typeof propertyKeys === "string" && propertyKeys.includes(".")) {
        for (const key of propertyKeys.split(".")) {
            if (!$in(current, key)) {
                return false;
            }

            current = current[key];
        }

        return type === undefined || $predicate(current, type);
    }

    if (current == null) {
        return false;
    }

    return ((typeof current === "object" && propertyKeys in current) || current[propertyKeys] !== undefined) && (type === undefined || $predicate(current[propertyKeys], type));
}