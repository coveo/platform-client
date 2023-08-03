import {LicenseSection} from '../../index.js';
import API from '../../../APICore.js';
import Limits from '../Limits.js';
import {LimitType} from '../LimitsInterfaces.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('Limits', () => {
    let limits: Limits;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        limits = new Limits(api, serverlessApi);
    });

    describe('get', () => {
        it('should make a GET call to the specific part of the limits', () => {
            limits.get(LicenseSection.content);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/limits/content`);
        });
    });

    describe('getAll', () => {
        it('should make a GET call to get all limits', () => {
            limits.getAll();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/limits`);
        });
    });

    describe('getHistoryLimit', () => {
        it('should make a GET call to get specific history limit to the specific part of the limit', () => {
            limits.getHistoryLimit(LicenseSection.content, '123');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/limits/content/123/history`);
        });

        it('should make a GET call to get specific history limit to the specific part of the limit with specific date when defined', () => {
            limits.getHistoryLimit(LicenseSection.content, '123', {from: '2020-05-06', to: '2021-10-05'});
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                `/rest/organizations/{organizationName}/limits/content/123/history?from=2020-05-06&to=2021-10-05`,
            );
        });
    });

    describe('getAllPerLimitType', () => {
        it('should make a GET call to get all limits with specified limit type', () => {
            limits.getAllPerLimitType(LimitType.TECHNICAL);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/limits?limitType=TECHNICAL`);
        });
    });

    describe('getSpecificLimitStatus', () => {
        it('should make a GET call to get a specific limit status', () => {
            limits.getSpecificLimitStatus(LicenseSection.content, '123');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/limits/content/123`);
        });
    });
});
