export function $element(x: unknown): x is HTMLElement;
export function $element<T extends keyof HTMLElementTagNameMap>(x: unknown, tag?: T): x is HTMLElementTagNameMap[T];
export function $element<T extends keyof HTMLElementDeprecatedTagNameMap>(x: unknown, tag?: T): x is HTMLElementDeprecatedTagNameMap[T];
export function $element<T extends keyof SVGElementTagNameMap>(x: unknown, tag?: T): x is SVGElementTagNameMap[T];
export function $element(x: unknown, tag?: string): boolean {
    return tag ? x instanceof document.createElement(tag).constructor : x instanceof HTMLElement;
}