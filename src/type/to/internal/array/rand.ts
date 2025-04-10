export function $rand<T>(x: ArrayLike<T>): T {
    return x[Math.floor(Math.random() * x.length)];
}