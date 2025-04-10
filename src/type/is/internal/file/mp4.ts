import {$extensions} from "./extensions";

export function $mp4(x: File): Promise<boolean> {
    return $extensions(x, "mp4");
}