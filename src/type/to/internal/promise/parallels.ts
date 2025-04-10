export function $parallels<T>(x: (() => T | PromiseLike<T>)[], poolSize: number = Infinity): Promise<Awaited<T>[]> {
    return new Promise(resolve => {
        const results: any = [];
        let index = 0;
        let activePromises = 0;

        const executeNext = () => {
            while (activePromises < poolSize && index < x.length) {
                const currentIndex = index;
                const promiseFunc = x[currentIndex];
                activePromises++;
                index++;

                Promise.resolve()
                    .then(() => promiseFunc())
                    .then(result => {
                        results[currentIndex] = result;
                    })
                    .catch(error => {
                        results[currentIndex] = error;
                    })
                    // eslint-disable-next-line no-loop-func
                    .finally(() => {
                        activePromises--;

                        if (index < x.length) {
                            executeNext();
                        } else if (activePromises === 0) {
                            resolve(results);
                        }
                    });
            }
        };

        executeNext();
    });
}