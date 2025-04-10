export function $native(x: (...args: any[]) => any): boolean {
    let source = "";

    try {
        source = Function.prototype.toString.call(x);
    } catch {
        try {
            source = x + "";
        } catch {
        }
    }

    return new RegExp('^' + Function.prototype.toString.call(Object.prototype.hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function)\s*[^(]*\([^)]*\)\s*\{\s*\[native code]\s*}/g, '$1.*?') + '$').test(source);
}