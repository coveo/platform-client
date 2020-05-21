import retrieve, {Retrievable} from '../Retriever';

describe('Retriever', () => {
    it('should return the value directly if it is not a function', () => {
        const parameter: Retrievable<string> = '🍄';
        expect(retrieve(parameter)).toBe('🍄');
    });

    it('should return the value directly if it is a function', () => {
        const parameter: Retrievable<string> = () => '🍅';
        expect(retrieve(parameter)).toBe('🍅');
    });
});
