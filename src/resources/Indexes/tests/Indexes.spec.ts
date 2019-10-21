import API from '../../../APICore';
import Indexes from '../Indexes';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Cluster', () => {
    let indexes: Indexes;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        indexes = new Indexes(api);
    });

    describe('list', () => {
        it('should make a GET call to the Cluster base url', () => {
            indexes.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Indexes.baseUrl);
        });
    });

    describe('get', () => {
        it('should make a GET call for specific index', () => {
            const indexId = 'ABC123';
            indexes.get(indexId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}`);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call for specific index', () => {
            const indexId = 'ABC123';
            indexes.delete(indexId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Indexes.baseUrl}/${indexId}`);
        });
    });

    describe('create', () => {
        it('should make a CREATE call with no arguments', () => {
            indexes.create({});
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Indexes.baseUrl, {});
        });
    });
});
