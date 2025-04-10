export function setImmutableProperty(x: any, prop: PropertyKey, value?: any): void {
    Object.defineProperty(x, prop, {
        configurable: false,
        enumerable: false,
        writable: false,
        ...(value !== undefined && {value}),
    });
}
