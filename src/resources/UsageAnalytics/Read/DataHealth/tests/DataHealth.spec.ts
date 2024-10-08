import API from '../../../../../APICore.js';
import DataHealth from '../DataHealth.js';
import {
    DataHealthGetEventPayloadParams,
    DataHealthGetFailedInstancesParams,
    DataHealthGetGroupDetailParams,
    DataHealthGetGroupListingParams,
    DataHealthGetOverviewParams,
    DataHealthGetTrackingIdsParams,
    DataHealthListEventsParameters,
    DataHealthListFacetValueParams,
    DataHealthGetEventProblemsParams,
} from '../DataHealthInterfaces.js';

jest.mock('../../../../../APICore.js');

describe('DataHealth', () => {
    let dataHealth: DataHealth;
    const baseParams = {
        from: '1986-04-26T01:23:58.000Z',
        to: '1986-04-27T02:32:15.000Z',
    };
    const api = jest.mocked(new API({accessToken: '🔑'}));
    const serverlessApi = jest.mocked(new API({accessToken: '🔑'}, true));
    Object.defineProperty(api, 'organizationId', {get: () => 'someOrgId'});
    beforeEach(() => {
        jest.clearAllMocks();
        dataHealth = new DataHealth(api, serverlessApi);
    });

    describe('listEvents', () => {
        it('should make a GET call to the data health list events url', async () => {
            const dataHealthListEventsParams: DataHealthListEventsParameters = {
                ...baseParams,
            };
            await dataHealth.listEvents(dataHealthListEventsParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/events?org=someOrgId&from=1986-04-26T01%3A23%3A58.000Z&to=1986-04-27T02%3A32%3A15.000Z`,
            );
        });
    });

    describe('getEventPayload', () => {
        it('should make a GET call to the data health get event payload url', async () => {
            const dataHealthGetEventPayloadParams: DataHealthGetEventPayloadParams = {
                eventId: 'somePotato',
                timestamp: baseParams.from,
            };
            await dataHealth.getEventPayload(dataHealthGetEventPayloadParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/events/payload?org=someOrgId&eventId=somePotato&timestamp=1986-04-26T01%3A23%3A58.000Z`,
            );
        });
    });

    describe('listFacetValues', () => {
        it('should make a GET call to the data health list facets url', async () => {
            const dataHealthListFacetValuesParams: DataHealthListFacetValueParams = {
                ...baseParams,
                facet: 'potate',
            };
            await dataHealth.listFacetValues(dataHealthListFacetValuesParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/facets?org=someOrgId&from=1986-04-26T01%3A23%3A58.000Z&to=1986-04-27T02%3A32%3A15.000Z&facet=potate`,
            );
        });
    });

    describe('getOverview', () => {
        it('should make a GET call to the data health get overview url', async () => {
            const dataHealthGetOverviewParams: DataHealthGetOverviewParams = {
                ...baseParams,
                category: 'unicorns',
                trackingId: ['PetShop'],
            };
            await dataHealth.getOverview(dataHealthGetOverviewParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/overview?org=someOrgId&from=1986-04-26T01%3A23%3A58.000Z&to=1986-04-27T02%3A32%3A15.000Z&category=unicorns&trackingId=PetShop`,
            );
        });
    });

    describe('getGroupListing', () => {
        it('should make a GET call to the data health get group listing url', async () => {
            const dataHealthGetGroupListingParams: DataHealthGetGroupListingParams = {
                ...baseParams,
                category: 'unicorns',
                trackingId: ['PetShop'],
            };
            await dataHealth.getGroupListing(dataHealthGetGroupListingParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/groups?org=someOrgId&from=1986-04-26T01%3A23%3A58.000Z&to=1986-04-27T02%3A32%3A15.000Z&category=unicorns&trackingId=PetShop`,
            );
        });
    });

    describe('getGroupDetail', () => {
        it('should make a GET call to the data health get group detail url', async () => {
            const dataHealthGetGroupDetailParams: DataHealthGetGroupDetailParams = {
                ...baseParams,
                category: 'unicorns',
                group: 'horned',
                trackingId: ['PetShop'],
            };
            await dataHealth.getGroupDetail(dataHealthGetGroupDetailParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/groups/detail?org=someOrgId&from=1986-04-26T01%3A23%3A58.000Z&to=1986-04-27T02%3A32%3A15.000Z&category=unicorns&group=horned&trackingId=PetShop`,
            );
        });
    });

    describe('getTrackingIds', () => {
        it('should make a GET call to the data health get tracking id url', async () => {
            const dataHealthGetTrackingIdsParams: DataHealthGetTrackingIdsParams = {
                ...baseParams,
            };
            await dataHealth.getTrackingIds(dataHealthGetTrackingIdsParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/facets?org=someOrgId&from=1986-04-26T01%3A23%3A58.000Z&to=1986-04-27T02%3A32%3A15.000Z&facet=TRACKING_ID`,
            );
        });
    });

    describe('getEventsProblems', () => {
        it('should make a GET call to the data health get events problems url', async () => {
            const datahealthGetEventsProblemsParams: DataHealthGetEventProblemsParams = {
                ...baseParams,
            };
            await dataHealth.getEventsProblems(datahealthGetEventsProblemsParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/events/problems?org=someOrgId&from=1986-04-26T01%3A23%3A58.000Z&to=1986-04-27T02%3A32%3A15.000Z`,
            );
        });
    });

    describe('getFailedInstances', () => {
        it('should make a GET call to the data health get failed instances url', async () => {
            const datahealthGetFailedInstancesParams: DataHealthGetFailedInstancesParams = {
                ...baseParams,
                criterionId: 'criterion',
                group: 'group',
            };
            await dataHealth.getFailedInstances(datahealthGetFailedInstancesParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/criteria/failedInstances?org=someOrgId&from=1986-04-26T01%3A23%3A58.000Z&to=1986-04-27T02%3A32%3A15.000Z&criterionId=criterion&group=group`,
            );
        });
    });
});
