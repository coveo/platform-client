export interface StringifyQueryOptions {
    /**
     * Skip keys (and array items) whose value is an empty string.
     * @default true
     */
    skipEmptyString?: boolean;
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
 * - `undefined` and `null` values are always skipped.
 * - Keys keep their insertion order.
 * - Arrays repeat the key for each item (`a=1&a=2`).
 * - Keys and values are strictly URI-encoded.
 *
 * The output matches `query-string`'s `stringify` with `{sort: false, skipNull: true}` and the default `arrayFormat: 'none'`.
 * @param parameters The parameters to serialize.
 * @param options The serialization options.
 * @param options.skipEmptyString Skip keys (and array items) whose value is an empty string. Defaults to `true`.
 * @returns The query string, without the leading `?`.
 */
export const stringifyQuery = (parameters: object, {skipEmptyString = true}: StringifyQueryOptions = {}): string =>
    Object.entries(parameters)
        .flatMap(([key, value]) =>
            (Array.isArray(value) ? value : [value])
                .filter((item) => item !== undefined && item !== null && !(skipEmptyString && item === ''))
                .map((item) => `${strictEncode(key)}=${strictEncode(item)}`),
        )
        .join('&');
