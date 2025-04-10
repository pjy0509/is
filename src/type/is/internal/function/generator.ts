import {getTag} from "../../../utils/function/getTag";
import {tags} from "../../../utils/constant/tags";

export function $generator(x: unknown): x is GeneratorFunction {
    const tag = getTag(x);
    return tag === tags.generatorFunction || tag === tags.asyncGeneratorFunction;
}