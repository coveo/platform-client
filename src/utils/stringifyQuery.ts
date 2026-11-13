export interface StringifyQueryOptions {
    /**
     * Skip keys (and array items) whose value is an empty string.
     * @default true
     */
    skipEmptyString?: boolean;
    /**
     * Skip keys (and array items) whose value is `null`. When `false`, `null` values are serialized as the bare key.
     * @default true
     */
    skipNull?: boolean;
}

/**
 * Same as `encodeURIComponent`, but also encodes `!'()*` as per RFC 3986.
 * @param value The value to encode.
 * @returns The encoded value.
 */
const strictEncode = (value: unknown): string =>
    encodeURIComponent(String(value)).replace(
        /[!'()*]/g,
        (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
    );

/**
 * Serializes an object into a query string (without the leading `?`).
 *
 * - `undefined` values are always skipped.
 * - Keys keep their insertion order.
 * - Arrays repeat the key for each item (`a=1&a=2`).
 * - Keys and values are strictly URI-encoded.
 *
 * The output matches `query-string`'s `stringify` with `{sort: false}` and the default `arrayFormat: 'none'`.
 * @param parameters The parameters to serialize.
 * @param options The serialization options.
 * @returns The query string, without the leading `?`.
 */
export const stringifyQuery = (parameters: object, options: StringifyQueryOptions = {}): string => {
    const {skipEmptyString = true, skipNull = true} = options;

    const serialize = (key: string, value: unknown): string => {
        if (value === undefined || (skipNull && value === null) || (skipEmptyString && value === '')) {
            return '';
        }
        return value === null ? strictEncode(key) : `${strictEncode(key)}=${strictEncode(value)}`;
    };

    return Object.entries(parameters)
        .flatMap(([key, value]) =>
            Array.isArray(value) ? value.map((item) => serialize(key, item)) : serialize(key, value),
        )
        .filter((pair) => pair.length > 0)
        .join('&');
};
