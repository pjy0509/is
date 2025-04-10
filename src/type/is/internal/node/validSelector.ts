export function $validSelector(x: string) {
    try {
        document.querySelector(x);
        return true;
    } catch {
        return false;
    }
}