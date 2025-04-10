import {TimeoutError} from "../../../utils/error/TimeoutError";
import {$delay} from "./delay";

export function $timeout<T>(x: () => T | PromiseLike<T>, after: number = 0, message?: string): Promise<T> {
    return Promise.race([
        (async () => {
            await $delay(after);
            throw new TimeoutError(message);
        })(),
        x()
    ]);
}