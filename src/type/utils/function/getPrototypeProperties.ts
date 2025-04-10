export function getPrototypeProperties(x: any): (string | symbol)[] {
    return (Object.keys(x) as (string | symbol)[]).concat(Object.getOwnPropertySymbols(x), Object.getOwnPropertyNames(Object.getPrototypeOf(x)), Object.getOwnPropertySymbols(Object.getPrototypeOf(x)));
}