import {$extensions} from "./extensions";

export function $wav(x: File): Promise<boolean> {
    return $extensions(x, "wav");
}