import {$extensions} from "./extensions";

export function $png(x: File): Promise<boolean> {
    return $extensions(x, "png");
}