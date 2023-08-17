import API from '../../APICore.js';
import {New, PageModel} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {
    InsightPanelConfigCreationParams,
    InsightPanelConfigDuplicateParams,
    InsightPanelConfigListOptions,
    InsightPanelConfigModel,
    InsightPanelConfigUpdateParams,
} from './InsightPanelConfigInterfaces.js';

export default class InsightPanelConfig extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/insightconfig/v1/configs`;

    list(options?: InsightPanelConfigListOptions) {
        return this.api.get<PageModel<InsightPanelConfigModel>>(this.buildPath(InsightPanelConfig.baseUrl, options));
    }

    create(insightPanelConfig: New<InsightPanelConfigCreationParams>) {
        return this.api.post<InsightPanelConfigModel>(InsightPanelConfig.baseUrl, insightPanelConfig);
    }

    delete(insightPanelConfigId: string) {
        return this.api.delete(`${InsightPanelConfig.baseUrl}/${insightPanelConfigId}`);
    }

    get(insightPanelConfigId: string) {
        return this.api.get<InsightPanelConfigModel>(`${InsightPanelConfig.baseUrl}/${insightPanelConfigId}`);
    }

    update(insightPanelConfig: InsightPanelConfigUpdateParams) {
        const {id, ...body} = insightPanelConfig;

        return this.api.put<InsightPanelConfigModel>(`${InsightPanelConfig.baseUrl}/${id}`, body);
    }

    duplicate(duplicationParams: InsightPanelConfigDuplicateParams) {
        const {id, name} = duplicationParams;

        return this.api.post<InsightPanelConfigModel>(`${InsightPanelConfig.baseUrl}/${id}`, name);
    }
}
