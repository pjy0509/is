import {$extensions} from "./extensions";

export function $mov(x: File): Promise<boolean> {
    return $extensions(x, "mov");
}