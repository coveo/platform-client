import API from '../../APICore';
import {New, PageModel} from '../BaseInterfaces';
import Resource from '../Resource';
import {
    InsightPanelConfigCreationParams,
    InsightPanelConfigListOptions,
    InsightPanelConfigModel,
} from './InsightPanelConfigInterfaces';

export default class InsightPanelConfig extends Resource {
    static baseUrl = `/rest/organization/${API.orgPlaceholder}/insight-config/v1/configs`;

    list(options?: InsightPanelConfigListOptions) {
        const effectiveOptions = {
            ...options,
            sorting: options?.sorting ?? 'asc',
        };

        return this.api.get<PageModel<InsightPanelConfigModel, 'configurations'>>(
            this.buildPath(InsightPanelConfig.baseUrl, effectiveOptions)
        );
    }

    create(insightPanelConfig: New<InsightPanelConfigCreationParams>) {
        return this.api.post<InsightPanelConfigCreationParams>(InsightPanelConfig.baseUrl, insightPanelConfig);
    }

    delete(insightPanelConfigId: string) {
        return this.api.delete(`${InsightPanelConfig.baseUrl}/${insightPanelConfigId}`);
    }

    get(insightPanelConfigId: string) {
        return this.api.get<InsightPanelConfigModel>(`${InsightPanelConfig.baseUrl}/${insightPanelConfigId}`);
    }

    update(insightPanelConfig: InsightPanelConfigCreationParams) {
        const {id, ...body} = insightPanelConfig;

        return this.api.put<InsightPanelConfigCreationParams>(`${InsightPanelConfig.baseUrl}/${id}`, body);
    }
}
