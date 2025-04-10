export function $nextMicroTaskQueue<T>(x: () => T): Promise<T> {
    return new Promise(resolve => Promise.resolve().then(() => resolve(x())));
}