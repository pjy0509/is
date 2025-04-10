export function $validPseudo(x: string): boolean {
    try {
        document.querySelector("html" + x);
        return true;
    } catch (e) {
        return false;
    }
}