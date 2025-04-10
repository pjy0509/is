export function $nextTaskQueue<T>(x: () => T): Promise<T> {
    return new Promise(resolve => setTimeout(() => resolve(x())));
}