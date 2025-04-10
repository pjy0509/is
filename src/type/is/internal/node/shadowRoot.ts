export function $shadowRoot(x: unknown): x is ShadowRoot {
    return x instanceof ShadowRoot;
}