export type Retrievable<T> = T | (() => T);

const isFunction = <T>(x: any): x is () => T => typeof x === 'function';

export default <T>(parameter: Retrievable<T>): T => (isFunction(parameter) ? parameter() : parameter);
