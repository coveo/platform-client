import API from '../../APICore';
import {LicenseSection} from '../Enums';
import Resource from '../Resource';
import {AllLimitsModel, LimitsModel} from './LimitsInterfaces';

export default class Limits extends Resource {
    static getBaseUrl = () => `/rest/organizations/${API.orgPlaceholder}/limits`;
    static getWithSection = (sectionName: LicenseSection) => `${Limits.getBaseUrl()}/${sectionName}`;

    get(sectionName: LicenseSection) {
        return this.api.get<LimitsModel>(Limits.getWithSection(sectionName));
    }

    getAll() {
        return this.api.get<AllLimitsModel>(Limits.getBaseUrl());
    }
}
