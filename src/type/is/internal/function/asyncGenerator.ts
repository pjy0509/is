import {getTag} from "../../../utils/function/getTag";
import {tags} from "../../../utils/constant/tags";

export function $asyncGenerator(x: unknown): x is AsyncGeneratorFunction {
    return getTag(x) === tags.asyncGeneratorFunction;
}