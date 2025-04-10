import {getTag} from "../../../utils/function/getTag";
import {tags} from "../../../utils/constant/tags";

export function $async(x: unknown): x is (...args: any[]) => Promise<any> {
    const tag = getTag(x);
    return tag === tags.asyncFunction || tag === tags.asyncGeneratorFunction;
}