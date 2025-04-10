export function $converter(): number;
export function $converter(x: unknown): number;
export function $converter<T extends any[]>(...x: T): number;
export function $converter(): number {
    const length = arguments.length;

    if (length === 0) {
        return 0;
    }

    if (length === 1) {
        return +(arguments[0] as any);
    }

    return NaN;
}