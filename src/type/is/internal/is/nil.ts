export function $nil(x: unknown): x is null | undefined {
    return x == null;
}