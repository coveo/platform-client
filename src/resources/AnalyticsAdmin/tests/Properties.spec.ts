import API from '../../../APICore.js';
import Properties from '../Properties/Properties.js';

jest.mock('../../../APICore.js');

describe('Properties', () => {
    let properties: Properties;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        properties = new Properties(api, serverlessApi);
    });

    describe('listProperties', () => {
        it('should make a GET call to the list path', async () => {
            await properties.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Properties.baseUrl}/properties/list`);
        });

        it('should make a GET call to the list path with pagination', async () => {
            await properties.list({page: 1, perPage: 2});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Properties.baseUrl}/properties/list?page=1&perPage=2`);
        });

        it('should make a GET call to the list path with filter', async () => {
            await properties.list({filter: 'test'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Properties.baseUrl}/properties/list?filter=test`);
        });
    });

    describe('getProperty', () => {
        it('should make a GET call to the properties path', async () => {
            await properties.get('trackingId');

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Properties.baseUrl}/properties/trackingId`);
        });
    });

    describe('createProperty', () => {
        it('should make a POST call to the properties path', async () => {
            await properties.create('trackingId', 'displayName');

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Properties.baseUrl}/properties/trackingId?displayName=displayName`,
            );
        });
    });

    describe('updateProperty', () => {
        it('should make a PUT call to the properties path', async () => {
            await properties.update('trackingId', 'displayName');

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Properties.baseUrl}/properties/trackingId?displayName=displayName`);
        });
    });

    describe('deleteProperty', () => {
        it('should make a DELETE call to the properties path', async () => {
            await properties.delete('trackingId');

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Properties.baseUrl}/properties/trackingId`);
        });
    });
});
