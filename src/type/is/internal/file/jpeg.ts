import {$extensions} from "./extensions";

export function $jpeg(x: File): Promise<boolean> {
    return $extensions(x, "jpeg");
}