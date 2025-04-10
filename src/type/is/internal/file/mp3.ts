import {$extensions} from "./extensions";

export function $mp3(x: File): Promise<boolean> {
    return $extensions(x, "mp3");
}