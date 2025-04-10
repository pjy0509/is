import {tags} from "../constant/tags";

export function getTag(x: any): string {
    if (x === null) {
        return tags.null;
    }

    if (x === undefined) {
        return tags.undefined;
    }

    return x;
}