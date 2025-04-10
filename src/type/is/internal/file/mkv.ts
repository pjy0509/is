import {$extensions} from "./extensions";

export function $mkv(x: File): Promise<boolean> {
    return $extensions(x, "mkv");
}