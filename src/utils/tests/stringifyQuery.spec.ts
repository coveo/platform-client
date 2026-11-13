import {stringifyQuery} from '../stringifyQuery.js';

describe('stringifyQuery', () => {
    it('returns an empty string for an empty object', () => {
        expect(stringifyQuery({})).toBe('');
    });

    it('keeps the insertion order of the keys', () => {
        expect(stringifyQuery({b: '1', a: '2', c: '3'})).toBe('b=1&a=2&c=3');
    });

    it('stringifies numbers and booleans', () => {
        expect(stringifyQuery({page: 0, perPage: 100, ratio: 1.5, enabled: true, disabled: false})).toBe(
            'page=0&perPage=100&ratio=1.5&enabled=true&disabled=false',
        );
    });

    it('always skips undefined values', () => {
        expect(stringifyQuery({a: undefined, b: '1'})).toBe('b=1');
        expect(stringifyQuery({a: undefined, b: '1'}, {skipNull: false, skipEmptyString: false})).toBe('b=1');
    });

    it('skips null values by default', () => {
        expect(stringifyQuery({a: null, b: '1'})).toBe('b=1');
    });

    it('serializes null values as the bare key when skipNull is false', () => {
        expect(stringifyQuery({a: null, b: '1'}, {skipNull: false})).toBe('a&b=1');
    });

    it('skips empty strings by default', () => {
        expect(stringifyQuery({pipeline: '', b: '1'})).toBe('b=1');
    });

    it('keeps empty strings when skipEmptyString is false', () => {
        expect(stringifyQuery({pipeline: '', b: '1'}, {skipEmptyString: false})).toBe('pipeline=&b=1');
    });

    it('repeats the key for each array item', () => {
        expect(stringifyQuery({ids: ['a', 'b', 'c'], other: 1})).toBe('ids=a&ids=b&ids=c&other=1');
    });

    it('skips an empty array', () => {
        expect(stringifyQuery({ids: [], other: 1})).toBe('other=1');
    });

    it('applies the same skipping rules to array items', () => {
        const parameters = {ids: ['a', '', null, undefined, 'b']};

        expect(stringifyQuery(parameters)).toBe('ids=a&ids=b');
        expect(stringifyQuery(parameters, {skipEmptyString: false})).toBe('ids=a&ids=&ids=b');
        expect(stringifyQuery(parameters, {skipNull: false})).toBe('ids=a&ids&ids=b');
    });

    it('strictly encodes keys and values', () => {
        expect(stringifyQuery({"a b!'()*": "c&d=e/f?g#h+i%j!'()*~-_."})).toBe(
            'a%20b%21%27%28%29%2A=c%26d%3De%2Ff%3Fg%23h%2Bi%25j%21%27%28%29%2A~-_.',
        );
    });

    it('encodes non-ASCII characters as UTF-8', () => {
        expect(stringifyQuery({q: 'été 😀'})).toBe('q=%C3%A9t%C3%A9%20%F0%9F%98%80');
    });

    it('encodes JSON-stringified nested objects', () => {
        expect(stringifyQuery({commerce: '{"catalogId":"test"}'})).toBe('commerce=%7B%22catalogId%22%3A%22test%22%7D');
    });
});
