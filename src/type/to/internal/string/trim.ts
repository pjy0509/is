import {$trimStart} from "./trimStart";
import {$trimEnd} from "./trimEnd";

export function $trim(x: string, ...chars: string[]): string {
    return $trimStart($trimEnd(x, ...chars), ...chars);
}