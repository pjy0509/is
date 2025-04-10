import {Extensions} from "../../../utils/types";
import {Signature} from "../../../utils/class/Signature";
import {signatures} from "../../../utils/constant/signatures";
import {$map} from "../../../utils/function/map";

export function $extensions(x: File, ...extensions: Extensions[]): Promise<boolean> {
    return Signature.merge($map(extensions, extension => signatures[extension])).check(x);
}