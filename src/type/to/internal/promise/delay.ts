import {AbortError} from "../../../utils/error/AbortError";

export function $delay(after: number = 0): Promise<void> & { abort(reason?: string): void } {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let aborted = false;

    const promise = new Promise<void>(resolve => {
        timeoutId = setTimeout(() => {
            timeoutId = null;

            if (!aborted) {
                resolve();
            }
        }, after);
    }) as Promise<void> & { abort(): void };

    promise.abort = function (reason?: string): void {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);

            timeoutId = null;
            aborted = true;
        }

        throw new AbortError(reason);
    };

    return promise;
}