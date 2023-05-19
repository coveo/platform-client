export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property];
};

export interface AsyncSupplier<T> {
    (): Promise<T>;
}

export interface Supplier<T> {
    (): T;
}

export interface Predicate<T> {
    (value: T): boolean;
}

export interface CoveoPlatformClientRequestInit extends Omit<RequestInit, 'method'> {}

export type WithOptional<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>;
