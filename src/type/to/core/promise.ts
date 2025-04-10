import to from "../index";
import {$converter} from "../internal/promise/converter";
import {$delay} from "../internal/promise/delay";
import {$timeout} from "../internal/promise/timeout";
import {$serial} from "../internal/promise/serial";
import {$serials} from "../internal/promise/serials";
import {$parallel} from "../internal/promise/parallel";
import {$parallels} from "../internal/promise/parallels";
import {$nextTaskQueue} from "../internal/promise/nextTaskQueue";
import {$nextMicroTaskQueue} from "../internal/promise/nextMicroTaskQueue";

export interface PromiseConverter {
    (): Promise<void>;

    <T>(x: Promise<T>): Promise<T>;

    <T>(x: ArrayLike<T>): Promise<Awaited<T>[]>;

    <T>(x: Iterable<T>): Promise<Awaited<T>[]>;

    <T>(x: T): Promise<Awaited<T>>;

    <T extends any[]>(...x: T): Promise<Awaited<T[number]>[]>;

    delay(after?: number): PromiseLike<void> & { abort(reason?: string): void };

    timeout<T>(x: () => T | PromiseLike<T>, after?: number, message?: string): Promise<T>;

    serial<T, U extends PropertyKey>(x: { [Key in U]: (() => T | PromiseLike<T>) }): Promise<{ [Key in U]: Awaited<T> }>;

    serials<T>(x: (() => T | PromiseLike<T>)[]): Promise<Awaited<T>[]>;

    parallel<T, U extends PropertyKey>(x: { [Key in U]: (() => T | PromiseLike<T>) }, poolSize?: number): Promise<{ [Key in U]: Awaited<T> }>;

    parallels<T>(x: (() => T | PromiseLike<T>)[], poolSize?: number): Promise<Awaited<T>[]>;

    [Symbol.toStringTag]: string;
}

export const $promise: PromiseConverter = Object.assign(
    $converter,
    {
        delay: $delay,
        timeout: $timeout,
        serial: $serial,
        serials: $serials,
        parallel: $parallel,
        parallels: $parallels,
        nextTaskQueue: $nextTaskQueue,
        nextMicroTaskQueue: $nextMicroTaskQueue,

        [Symbol.toStringTag]: "To.Promise"
    }
)