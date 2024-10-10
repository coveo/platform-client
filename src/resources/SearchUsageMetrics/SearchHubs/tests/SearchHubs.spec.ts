import API from '../../../../APICore.js';
import SearchHubs from '../SearchHubs.js';
import {ListSearchHubsParams} from '../SearchHubsInterface.js';

jest.mock('../../../../APICore.js');

describe('SearchHubs', () => {
    let searchHubs: SearchHubs;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        searchHubs = new SearchHubs(api, serverlessApi);
    });

    describe('list', () => {
        it('makes a GET call to the SearchHub base url', async () => {
            await searchHubs.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(SearchHubs.baseUrl);
        });

        it('makes the call with parameters if it is set', async () => {
            const params: ListSearchHubsParams = {
                filter: 'patate',
                perPage: 25,
                page: 1,
            };
            await searchHubs.list(params);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchHubs.baseUrl}?filter=patate&pageSize=25&page=1`);
        });

        it('makes the call with parameters if it is partially set', async () => {
            const partialParams: ListSearchHubsParams = {
                filter: 'patate',
            };
            await searchHubs.list(partialParams);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchHubs.baseUrl}?filter=patate`);
        });
    });

    describe('create', () => {
        it('makes a POST call to the SearchHub base url with the set hub', async () => {
            const newSearchHub = {name: 'hello', bucket: 'bonjour', description: 'hola'};
            await searchHubs.create(newSearchHub);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${SearchHubs.baseUrl}`, newSearchHub);
        });
    });

    describe('get', () => {
        it('makes a GET call to the specific SearchHub url', async () => {
            const getSearchHub = {hubName: 'hello'};
            await searchHubs.get(getSearchHub);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${SearchHubs.baseUrl}${getSearchHub.hubName}`);
        });
    });

    describe('delete', () => {
        it('makes a DELETE call to the specific SearchHub url', async () => {
            const deleteSearchHub = {hubName: 'hello'};
            await searchHubs.delete(deleteSearchHub);

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${SearchHubs.baseUrl}${deleteSearchHub.hubName}`);
        });
    });

    describe('update', () => {
        it('makes a PUT call to the specific SearchHub url', async () => {
            const updateSearchHubParams = {name: 'hello', bucket: 'bonjour', description: 'hola'};
            const updateSearchHub = {hubName: 'hello', hub: updateSearchHubParams};
            await searchHubs.update(updateSearchHub);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${SearchHubs.baseUrl}${updateSearchHub.hubName}`,
                updateSearchHubParams,
            );
        });
    });

    describe('updateBucket', () => {
        it('makes a PUT call to the bucket SearchHub url', async () => {
            const updateBucketSearchHub = {hubName: 'hello', bucket: 'bonjour'};
            await searchHubs.updateBucket(updateBucketSearchHub);

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                `${SearchHubs.baseUrl}${updateBucketSearchHub.hubName}/bucket?bucket=${updateBucketSearchHub.bucket}`,
            );
        });
    });
});
