import {normalizePaginatedOptions} from '../normalizePaginatedOptions';

describe('normalizePaginatedOptions', () => {
    it('should throw if options has both perPage and pageSize in its keys', () => {
        expect(() => {
            normalizePaginatedOptions({pageSize: 0, perPage: 1});
        }).toThrow();
    });

    it('should return the same options object given in param if it has neither perPage or pageSize', () => {
        const optionsObject = {page: 0};
        expect(normalizePaginatedOptions(optionsObject)).toBe(optionsObject);
    });

    it('should return the same options object given in param if it has pageSize but not perPage', () => {
        const optionsObject = {page: 0, pageSize: 1};
        expect(normalizePaginatedOptions(optionsObject)).toBe(optionsObject);
    });

    it('should return a new options object with only pageSize if it has perPage but not pageSize', () => {
        const optionsObject = {page: 0, perPage: 1};
        const returnedObject = normalizePaginatedOptions(optionsObject);

        expect(returnedObject).not.toBe(optionsObject);
        expect(returnedObject).toMatchObject({page: 0, pageSize: 1});
    });
});
