import API from '../../../../../APICore.js';
import DataHealth from '../DataHealth.js';

jest.mock('../../../../../APICore');

describe('DataHealth', () => {
    let dataHealth: DataHealth;
    const api = jest.mocked(new API({accessToken: '🔑'}));
    const serverlessApi = jest.mocked(new API({accessToken: '🔑'}, true));
    Object.defineProperty(api, 'organizationId', {get: () => 'someOrgId'});
    beforeEach(() => {
        jest.clearAllMocks();
        dataHealth = new DataHealth(api, serverlessApi);
    });

    describe('listEvents', () => {
        it('should make a GET call to the Data Health events call', () => {
            dataHealth.listEvents({from: '2022-12-01T00:00:00.000Z', to: '2022-12-02T00:00:00.000Z'});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/events?org=someOrgId&from=2022-12-01T00%3A00%3A00.000Z&to=2022-12-02T00%3A00%3A00.000Z`
            );
        });
    });

    describe('getEventPayload', () => {
        it('should make a GET call to the Data Health event/payload call', () => {
            dataHealth.getEventPayload({eventId: 'abc-123', timestamp: '2022-12-01T00:00:00.000Z'});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/event/payload?org=someOrgId&eventId=abc-123&timestamp=2022-12-01T00%3A00%3A00.000Z`
            );
        });
    });

    describe('listFacetValues', () => {
        it('should make a GET call to the Data Health facets call', () => {
            dataHealth.listFacetValues({
                from: '2022-12-01T00:00:00.000Z',
                to: '2022-12-02T00:00:00.000Z',
                facet: 'test',
            });
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/facet?org=someOrgId&from=2022-12-01T00%3A00%3A00.000Z&to=2022-12-02T00%3A00%3A00.000Z&facet=test`
            );
        });
    });
});
