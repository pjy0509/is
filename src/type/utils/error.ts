import {getTag} from "./functions";
import is from "../is/index";

export function throwTypeError(x: unknown, message: string = ""): never {
    let tag: string = getTag(x);

    if (is.constructor(x)) {
        if (x.prototype.constructor.name) {
            tag = "Constructor (" + x.prototype.constructor.name + ")";
        } else {
            tag = "Constructor";
        }
    } else if (is.function(x)) {
        if (x.name) {
            tag = "Function (" + x.name + ")";
        } else {
            tag = "Function";
        }
    } else if (tag === "Object" && is.notNil<any>(x)) {
        if (x.constructor.name !== "Object") {
            tag = "Object (" + x.constructor.name + ")";
        } else {
            tag = "Object";
        }
    }

    throw new TypeError(" < " + tag + " > " + message);
}