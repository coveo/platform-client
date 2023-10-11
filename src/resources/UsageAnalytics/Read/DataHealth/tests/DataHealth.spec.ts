import API from '../../../../../APICore.js';
import DataHealth from '../DataHealth.js';
import {
    DataHealthGetEventPayloadParams,
    DataHealthGetGroupDetailParams,
    DataHealthGetGroupListingParams,
    DataHealthGetOverviewParams,
    DataHealthGetTrackingIdsParams,
    DataHealthListEventsParameters,
    DataHealthListFacetValueParams,
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
        it('should make a GET call to the data health list events url', () => {
            const dataHealthListEventsParams: DataHealthListEventsParameters = {
                ...baseParams,
            };
            dataHealth.listEvents(dataHealthListEventsParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/events?org=someOrgId&from=1986-04-26T01%3A23%3A58.000Z&to=1986-04-27T02%3A32%3A15.000Z`,
            );
        });
    });

    describe('getEventPayload', () => {
        it('should make a GET call to the data health get event payload url', () => {
            const dataHealthGetEventPayloadParams: DataHealthGetEventPayloadParams = {
                eventId: 'somePotato',
                timestamp: baseParams.from,
            };
            dataHealth.getEventPayload(dataHealthGetEventPayloadParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/events/payload?org=someOrgId&eventId=somePotato&timestamp=1986-04-26T01%3A23%3A58.000Z`,
            );
        });
    });

    describe('listFacetValues', () => {
        it('should make a GET call to the data health list facets url', () => {
            const dataHealthListFacetValuesParams: DataHealthListFacetValueParams = {
                ...baseParams,
                facet: 'potate',
            };
            dataHealth.listFacetValues(dataHealthListFacetValuesParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/facets?org=someOrgId&from=1986-04-26T01%3A23%3A58.000Z&to=1986-04-27T02%3A32%3A15.000Z&facet=potate`,
            );
        });
    });

    describe('getOverview', () => {
        it('should make a GET call to the data health get overview url', () => {
            const dataHealthGetOverviewParams: DataHealthGetOverviewParams = {
                ...baseParams,
                category: 'unicorns',
                trackingId: ['PetShop'],
            };
            dataHealth.getOverview(dataHealthGetOverviewParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/overview?org=someOrgId&from=1986-04-26T01%3A23%3A58.000Z&to=1986-04-27T02%3A32%3A15.000Z&category=unicorns&trackingId=PetShop`,
            );
        });
    });

    describe('getGroupListing', () => {
        it('should make a GET call to the data health get group listing url', () => {
            const dataHealthGetGroupListingParams: DataHealthGetGroupListingParams = {
                ...baseParams,
                category: 'unicorns',
                trackingId: ['PetShop'],
            };
            dataHealth.getGroupListing(dataHealthGetGroupListingParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/groups?org=someOrgId&from=1986-04-26T01%3A23%3A58.000Z&to=1986-04-27T02%3A32%3A15.000Z&category=unicorns&trackingId=PetShop`,
            );
        });
    });

    describe('getGroupDetail', () => {
        it('should make a GET call to the data health get group detail url', () => {
            const dataHealthGetGroupDetailParams: DataHealthGetGroupDetailParams = {
                ...baseParams,
                category: 'unicorns',
                group: 'horned',
                trackingId: ['PetShop'],
            };
            dataHealth.getGroupDetail(dataHealthGetGroupDetailParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/groups/detail?org=someOrgId&from=1986-04-26T01%3A23%3A58.000Z&to=1986-04-27T02%3A32%3A15.000Z&category=unicorns&group=horned&trackingId=PetShop`,
            );
        });
    });

    describe('getTrackingIds', () => {
        it('should make a GET call to the data health get tracking id url', () => {
            const dataHealthGetTrackingIdsParams: DataHealthGetTrackingIdsParams = {
                ...baseParams,
            };
            dataHealth.getTrackingIds(dataHealthGetTrackingIdsParams);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `${DataHealth.baseUrl}/facets?org=someOrgId&from=1986-04-26T01%3A23%3A58.000Z&to=1986-04-27T02%3A32%3A15.000Z&facet=TRACKING_ID`,
            );
        });
    });
});
