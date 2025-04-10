import {$extensions} from "./extensions";

export function $bmp(x: File): Promise<boolean> {
    return $extensions(x, "bmp");
}