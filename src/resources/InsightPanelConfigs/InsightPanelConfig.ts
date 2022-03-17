import API from '../../APICore';
import {New, PageModel} from '../BaseInterfaces';
import Resource from '../Resource';
import {
    InsightPanelConfigCreationParams,
    InsightPanelConfigListOptions,
    InsightPanelConfigModel,
} from './InsightPanelConfigInterfaces';

export default class InsightPanelConfig extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/insightconfig/v1/configs`;

    list(options?: InsightPanelConfigListOptions) {
        const effectiveOptions = {
            ...options,
            order: options?.order ?? 'asc',
        };

        return this.api.get<PageModel<InsightPanelConfigModel>>(
            this.buildPath(InsightPanelConfig.baseUrl, effectiveOptions)
        );
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

    update(insightPanelConfig: InsightPanelConfigCreationParams) {
        const {id, ...body} = insightPanelConfig;

        return this.api.put<InsightPanelConfigModel>(`${InsightPanelConfig.baseUrl}/${id}`, body);
    }
}
