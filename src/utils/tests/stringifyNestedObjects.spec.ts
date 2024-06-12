import {stringifyNestedObjects} from '../stringifyNestedObjects.js';

describe('stringifyNestedObjects', () => {
    it('should stringify a nested object', () => {
        expect(stringifyNestedObjects({commerce: {catalogId: 'test'}})).toEqual({commerce: '{"catalogId":"test"}'});
    });
    it('should not stringify booleans', () => {
        expect(stringifyNestedObjects({commerce: {catalogId: 'test'}, bool: true})).toEqual({
            bool: true,
            commerce: '{"catalogId":"test"}',
        });
    });
    it('should not stringify arrays', () => {
        expect(stringifyNestedObjects({commerce: {catalogId: 'test'}, arr: ['1', '2']})).toEqual({
            arr: ['1', '2'],
            commerce: '{"catalogId":"test"}',
        });
    });
});
