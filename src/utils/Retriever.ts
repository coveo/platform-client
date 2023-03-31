import {Supplier} from './types.js';

export type Retrievable<T> = T | Supplier<T>;

const isSupplier = <T>(x: unknown): x is Supplier<T> => typeof x === 'function';

export default <T>(parameter: Retrievable<T>): T => (isSupplier(parameter) ? parameter() : parameter);
