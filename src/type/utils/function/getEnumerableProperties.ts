export function getEnumerableProperties(x: any): (string | symbol)[] {
    return (Object.keys(x) as (string | symbol)[]).concat(Object.getOwnPropertySymbols(x).filter(symbol => Object.prototype.propertyIsEnumerable.call(x, symbol)));
}