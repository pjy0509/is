import {$extensions} from "./extensions";

export function $gif(x: File): Promise<boolean> {
    return $extensions(x, "gif");
}