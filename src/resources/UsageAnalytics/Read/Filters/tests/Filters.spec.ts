import API from '../../../../../APICore.js';
import Filters from '../Filters.js';
import {
    CreatePermissionsFilterModel,
    CreateReportingFilterModel,
    FilterTargetsModel,
    UpdatePermissionsFilterModel,
    UpdateReportingFilterModel,
} from '../FiltersInterfaces.js';

jest.mock('../../../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Filters', () => {
    let filters: Filters;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;
    const testFilterId = 'reporting-filter-id';

    beforeEach(() => {
        jest.clearAllMocks();
        filters = new Filters(api, serverlessApi);
    });

    describe('Reporting filters', () => {
        describe('list', () => {
            it('should make a GET call to the reporting filters base url', () => {
                filters.listReportFilters();

                expect(api.get).toHaveBeenCalledTimes(1);
                expect(api.get).toHaveBeenCalledWith(Filters.reportingBaseUrl);
            });
        });

        describe('get', () => {
            it('should make a GET call to the reporting filters base url for the specific ID', () => {
                filters.getReportFilter(testFilterId);

                expect(api.get).toHaveBeenCalledTimes(1);
                expect(api.get).toHaveBeenCalledWith(`${Filters.reportingBaseUrl}/${testFilterId}`);
            });
        });

        describe('create', () => {
            it('should make a POST call to the reporting filters base url for the specific ID', () => {
                const filter: CreateReportingFilterModel = {displayName: 'test', value: 'filter'};

                filters.createReportFilter(filter);

                expect(api.post).toHaveBeenCalledTimes(1);
                expect(api.post).toHaveBeenCalledWith(`${Filters.reportingBaseUrl}`, filter);
            });
        });

        describe('update', () => {
            it('should make a PUT call to the reporting filters base url for the specific ID', () => {
                const filter: UpdateReportingFilterModel = {displayName: 'test', value: 'filter'};

                filters.updateReportFilter(testFilterId, filter);

                expect(api.put).toHaveBeenCalledTimes(1);
                expect(api.put).toHaveBeenCalledWith(`${Filters.reportingBaseUrl}/${testFilterId}`, filter);
            });
        });

        describe('delete', () => {
            it('should make a DELETE call to the reporting filters base url for the specific ID', () => {
                filters.deleteReportFilter(testFilterId);

                expect(api.delete).toHaveBeenCalledTimes(1);
                expect(api.delete).toHaveBeenCalledWith(`${Filters.reportingBaseUrl}/${testFilterId}`);
            });
        });
    });

    describe('Permission filters', () => {
        describe('list', () => {
            it('should make a GET call to the permission filter base url', () => {
                filters.listPermissionFilters();

                expect(api.get).toHaveBeenCalledTimes(1);
                expect(api.get).toHaveBeenCalledWith(Filters.permissionsBaseUrl);
            });
        });

        describe('get', () => {
            it('should make a GET call to the permission filter base url for the specific ID', () => {
                filters.getPermissionFilter(testFilterId);

                expect(api.get).toHaveBeenCalledTimes(1);
                expect(api.get).toHaveBeenCalledWith(`${Filters.permissionsBaseUrl}/${testFilterId}`);
            });
        });

        describe('create', () => {
            it('should make a POST call to the permission filter base url for the specific ID', () => {
                const filter: CreatePermissionsFilterModel = {displayName: 'test', value: 'filter'};

                filters.createPermissionFilter(filter);

                expect(api.post).toHaveBeenCalledTimes(1);
                expect(api.post).toHaveBeenCalledWith(`${Filters.permissionsBaseUrl}`, filter);
            });
        });

        describe('update', () => {
            it('should make a PUT call to the permission filter base url for the specific ID', () => {
                const filter: UpdatePermissionsFilterModel = {displayName: 'test', value: 'filter'};

                filters.updatePermissionFilter(testFilterId, filter);

                expect(api.put).toHaveBeenCalledTimes(1);
                expect(api.put).toHaveBeenCalledWith(`${Filters.permissionsBaseUrl}/${testFilterId}`, filter);
            });
        });

        describe('delete', () => {
            it('should make a DELETE call to the permission filter base url for the specific ID', () => {
                filters.deletePermissionFilter(testFilterId);

                expect(api.delete).toHaveBeenCalledTimes(1);
                expect(api.delete).toHaveBeenCalledWith(`${Filters.permissionsBaseUrl}/${testFilterId}`);
            });
        });

        describe('Filter users', () => {
            describe('get', () => {
                it('should make a GET call to the permission filter users url for the specific ID', () => {
                    filters.getPermissionFilterUsers(testFilterId);

                    expect(api.get).toHaveBeenCalledTimes(1);
                    expect(api.get).toHaveBeenCalledWith(`${Filters.permissionsBaseUrl}/${testFilterId}/users`);
                });
            });

            describe('update', () => {
                it('should make a PUT call to the permission filter users url for the specific ID', () => {
                    const users = ['user.one@example.com', 'user.two@example.com'];

                    filters.updatePermissionFilterUsers(testFilterId, users);

                    expect(api.put).toHaveBeenCalledTimes(1);
                    expect(api.put).toHaveBeenCalledWith(`${Filters.permissionsBaseUrl}/${testFilterId}/users`, users);
                });
            });
        });

        describe('Filter targets', () => {
            describe('get', () => {
                it('should make a GET call to the permission filter targets url for the specific ID', () => {
                    filters.getPermissionFilterTargets(testFilterId);

                    expect(api.get).toHaveBeenCalledTimes(1);
                    expect(api.get).toHaveBeenCalledWith(`${Filters.permissionsBaseUrl}/${testFilterId}/targets`);
                });
            });

            describe('update', () => {
                it('should make a PUT call to the permission filter targets url for the specific ID', () => {
                    const filterTargets: FilterTargetsModel = {
                        targetedUsers: [],
                        targetedGroups: [],
                    };

                    filters.updatePermissionFilterTargets(testFilterId, filterTargets);

                    expect(api.put).toHaveBeenCalledTimes(1);
                    expect(api.put).toHaveBeenCalledWith(
                        `${Filters.permissionsBaseUrl}/${testFilterId}/targets`,
                        filterTargets,
                    );
                });
            });
        });
    });

    describe('checkHealth', () => {
        it('should make a GET call to the service healthcheck url', () => {
            filters.checkHealth();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Filters.baseUrl}/monitoring/health`);
        });
    });

    describe('checkStatus', () => {
        it('should make a GET call to the service status url', () => {
            filters.checkStatus();

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Filters.baseUrl}/status`);
        });
    });
});
