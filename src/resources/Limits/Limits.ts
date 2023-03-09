import API from '../../APICore.js';
import {LicenseSection} from '../Enums.js';
import Resource from '../Resource.js';
import {
    AllLimitsModel,
    LimitHistoryDataPointModel,
    LimitHistoryOptions,
    LimitsModel,
    LimitType,
    LimitModel,
} from './LimitsInterfaces.js';

export default class Limits extends Resource {
    static getBaseUrl = () => `/rest/organizations/${API.orgPlaceholder}/limits`;
    static getWithSection = (sectionName: LicenseSection) => `${Limits.getBaseUrl()}/${sectionName}`;
    static getWithSectionAndHistory = (sectionName: LicenseSection, limitKey: string) =>
        `${Limits.getWithSection(sectionName)}/${limitKey}/history`;
    static getSpecificLimit = (sectionName: LicenseSection, limitKey: string) =>
        `${Limits.getWithSection(sectionName)}/${limitKey}`;

    get(sectionName: LicenseSection) {
        return this.api.get<LimitsModel>(Limits.getWithSection(sectionName));
    }

    getAll() {
        return this.api.get<AllLimitsModel>(Limits.getBaseUrl());
    }

    getAllPerLimitType(limitType: LimitType) {
        return this.api.get<AllLimitsModel>(this.buildPath(Limits.getBaseUrl(), {limitType: limitType}));
    }

    /**
     * Shows the status of a specific limit in an organization
     *
     * @param sectionName The name of the target license section
     * @param limitKey The unique identifier of the target limit status to show
     */
    getSpecificLimitStatus(sectionName: LicenseSection, limitKey: string) {
        return this.api.get<LimitModel>(`${Limits.getSpecificLimit(sectionName, limitKey)}`);
    }

    getHistoryLimit(sectionName: LicenseSection, limitKey: string, options?: LimitHistoryOptions) {
        return this.api.get<LimitHistoryDataPointModel[]>(
            this.buildPath(Limits.getWithSectionAndHistory(sectionName, limitKey), options)
        );
    }
}
