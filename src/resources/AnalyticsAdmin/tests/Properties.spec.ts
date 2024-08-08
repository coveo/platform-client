import API from '../../../APICore.js';
import Properties from '../Properties/Properties.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Properties', () => {
    let properties: Properties;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        properties = new Properties(api, serverlessApi);
    });

    describe('listProperties', () => {
        it('should make a GET call to the list path', () => {
            properties.list();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Properties.baseUrl}/properties/list`);
        });

        it('should make a GET call to the list path with pagination', () => {
            properties.list({page: 1, perPage: 2});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Properties.baseUrl}/properties/list?page=1&perPage=2`);
        });

        it('should make a GET call to the list path with filter', () => {
            properties.list({filter: 'test'});

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Properties.baseUrl}/properties/list?filter=test`);
        });
    });

    describe('getProperty', () => {
        it('should make a GET call to the properties path', () => {
            properties.get('trackingId');

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Properties.baseUrl}/properties/trackingId`);
        });
    });

    describe('createProperty', () => {
        it('should make a POST call to the properties path', () => {
            properties.create('trackingId', 'displayName');

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                `${Properties.baseUrl}/properties/trackingId?displayName=displayName`,
            );
        });
    });

    describe('updateProperty', () => {
        it('should make a PUT call to the properties path', () => {
            properties.update('trackingId', 'displayName');

            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Properties.baseUrl}/properties/trackingId?displayName=displayName`);
        });
    });

    describe('deleteProperty', () => {
        it('should make a DELETE call to the properties path', () => {
            properties.delete('trackingId');

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Properties.baseUrl}/properties/trackingId`);
        });
    });
});
