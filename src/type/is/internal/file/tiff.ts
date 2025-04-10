import {$extensions} from "./extensions";

export function $tiff(x: File): Promise<boolean> {
    return $extensions(x, "tiff");
}