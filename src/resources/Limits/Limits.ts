import API from '../../APICore';
import {LicenseSection} from '../Enums';
import Resource from '../Resource';
import {
    AllLimitsModel,
    LimitHistoryDataPointModel,
    LimitHistoryOptions,
    LimitsModel,
    LimitType,
} from './LimitsInterfaces';

export default class Limits extends Resource {
    static getBaseUrl = () => `/rest/organizations/${API.orgPlaceholder}/limits`;
    static getWithSection = (sectionName: LicenseSection) => `${Limits.getBaseUrl()}/${sectionName}`;
    static getWithSectionAndHistory = (sectionName: LicenseSection, limitKey: string) =>
        `${Limits.getWithSection(sectionName)}/${limitKey}/history`;

    get(sectionName: LicenseSection) {
        return this.api.get<LimitsModel>(Limits.getWithSection(sectionName));
    }

    getAll() {
        return this.api.get<AllLimitsModel>(Limits.getBaseUrl());
    }

    getAllPerLimitType(limitType: LimitType) {
        return this.api.get<AllLimitsModel>(this.buildPath(Limits.getBaseUrl(), {limitType: limitType}));
    }

    getHistoryLimit(sectionName: LicenseSection, limitKey: string, options?: LimitHistoryOptions) {
        return this.api.get<LimitHistoryDataPointModel[]>(
            this.buildPath(Limits.getWithSectionAndHistory(sectionName, limitKey), options)
        );
    }
}
