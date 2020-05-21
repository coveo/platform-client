export type Retrievable<T> = T | (() => T);

function isFunction<T>(x: any): x is () => T {
    return typeof x === 'function';
}

export default <T>(parameter: Retrievable<T>): T => (isFunction(parameter) ? parameter() : parameter);
