import {$extensions} from "./extensions";

export function $m3u(x: File): Promise<boolean> {
    return $extensions(x, "m3u");
}