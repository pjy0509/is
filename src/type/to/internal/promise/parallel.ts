import {$parallels} from "./parallels";

export function $parallel<T, U extends PropertyKey>(x: { [Key in U]: (() => T | PromiseLike<T>) }, poolSize: number = Infinity): Promise<{ [Key in U]: Awaited<T> }> {
    const keys = Object.keys(x);
    const values: (() => T | PromiseLike<T>)[] = Object.values(x);

    return new Promise(resolve1 => {
        $parallels(values, poolSize)
            .then(resolve2 => {
                const result: any = {};

                for (let i = 0; i < keys.length; i++) {
                    result[keys[i]] = resolve2[i];
                }

                resolve1(result);
            });
    });
}