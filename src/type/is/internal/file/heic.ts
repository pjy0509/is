import {$extensions} from "./extensions";

export function $heic(x: File): Promise<boolean> {
    return $extensions(x, "heic");
}