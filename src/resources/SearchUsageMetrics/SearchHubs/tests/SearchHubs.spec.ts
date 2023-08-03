import API from '../../../../APICore.js';
import SearchHubs from '../SearchHubs.js';
import {ListSearchHubsParams} from '../SearchHubsInterface.js';

jest.mock('../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('SearchHubs', () => {
    let searchHubs: SearchHubs;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        searchHubs = new SearchHubs(api, serverlessApi);
    });

    describe('list', () => {
        it('makes a GET call to the SearchHub base url', () => {
            searchHubs.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(SearchHubs.baseUrl);
        });

        it('makes the call with parameters if it is set', () => {
            const params: ListSearchHubsParams = {
                filter: 'patate',
                perPage: 25,
                page: 1,
            };
            searchHubs.list(params);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchHubs.baseUrl}?filter=patate&pageSize=25&page=1`);
        });

        it('makes the call with parameters if it is partially set', () => {
            const partialParams: ListSearchHubsParams = {
                filter: 'patate',
            };
            searchHubs.list(partialParams);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchHubs.baseUrl}?filter=patate`);
        });
    });

    describe('create', () => {
        it('makes a POST call to the SearchHub base url with the set hub', () => {
            const newSearchHub = {name: 'hello', bucket: 'bonjour', description: 'hola'};
            searchHubs.create(newSearchHub);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SearchHubs.baseUrl}`, newSearchHub);
        });
    });

    describe('get', () => {
        it('makes a GET call to the specific SearchHub url', () => {
            const getSearchHub = {hubName: 'hello'};
            searchHubs.get(getSearchHub);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchHubs.baseUrl}${getSearchHub.hubName}`);
        });
    });

    describe('delete', () => {
        it('makes a DELETE call to the specific SearchHub url', () => {
            const deleteSearchHub = {hubName: 'hello'};
            searchHubs.delete(deleteSearchHub);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${SearchHubs.baseUrl}${deleteSearchHub.hubName}`);
        });
    });

    describe('update', () => {
        it('makes a PUT call to the specific SearchHub url', () => {
            const updateSearchHubParams = {name: 'hello', bucket: 'bonjour', description: 'hola'};
            const updateSearchHub = {hubName: 'hello', hub: updateSearchHubParams};
            searchHubs.update(updateSearchHub);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${SearchHubs.baseUrl}${updateSearchHub.hubName}`,
                updateSearchHubParams,
            );
        });
    });

    describe('updateBucket', () => {
        it('makes a PUT call to the bucket SearchHub url', () => {
            const updateBucketSearchHub = {hubName: 'hello', bucket: 'bonjour'};
            searchHubs.updateBucket(updateBucketSearchHub);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${SearchHubs.baseUrl}${updateBucketSearchHub.hubName}/bucket?bucket=${updateBucketSearchHub.bucket}`,
            );
        });
    });
});
