export function $sequential(x: string, n: number): boolean {
    if (n <= 1 || x.length < n) {
        return false;
    }

    // helper
    const getCharType = (x: number) => x >= 97 && x <= 122 ? 0 : x >= 65 && x <= 90 ? 1 : x >= 48 && x <= 57 ? 2 : -1;

    const a = x.split("");

    return a.some((_, i) => {
        if (i > a.length - n) {
            return false;
        }

        const p = getCharType(a[i].charCodeAt(0));

        if (p === -1) {
            return false;
        }

        return [1, -1].some(d => {
            return a.slice(i, i + n).every((s, j) => {
                const c = s.charCodeAt(0);

                return getCharType(c) === p && c === a[i].charCodeAt(0) + d * j;
            });
        });
    });
}