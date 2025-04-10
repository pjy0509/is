export function $dataView(x: unknown): x is DataView {
    try {
        return x instanceof DataView;
    } catch {
        return false;
    }
}