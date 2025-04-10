import {$extensions} from "./extensions";

export function $avi(x: File): Promise<boolean> {
    return $extensions(x, "avi");
}