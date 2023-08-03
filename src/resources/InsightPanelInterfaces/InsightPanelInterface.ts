import API from '../../APICore.js';
import {New, PageModel} from '../BaseInterfaces.js';
import {ListHostedInterfacesParams} from '../HostedInterfacesCore/index.js';
import Resource from '../Resource.js';
import {
    InsightPanelInterfaceConfiguration,
    InsightPanelInterfaceConfigurationUpdateParams,
} from './InsightPanelInterface.model.js';

export default class InsightPanelInterface extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/insightinterface/v1/interfaces`;

    list(options?: ListHostedInterfacesParams) {
        return this.api.get<PageModel<InsightPanelInterfaceConfiguration>>(
            this.buildPath(InsightPanelInterface.baseUrl, options),
        );
    }

    create(ipInterfaceConfig: New<InsightPanelInterfaceConfigurationUpdateParams>) {
        return this.api.post<InsightPanelInterfaceConfiguration>(InsightPanelInterface.baseUrl, ipInterfaceConfig);
    }

    delete(insightPanelInterfaceId: string) {
        return this.api.delete(`${InsightPanelInterface.baseUrl}/${insightPanelInterfaceId}`);
    }

    get(insightPanelInterfaceId: string) {
        return this.api.get<InsightPanelInterfaceConfiguration>(
            `${InsightPanelInterface.baseUrl}/${insightPanelInterfaceId}`,
        );
    }

    update(ipInterfaceConfig: InsightPanelInterfaceConfigurationUpdateParams) {
        const {id, ...body} = ipInterfaceConfig;

        return this.api.put<InsightPanelInterfaceConfigurationUpdateParams>(
            `${InsightPanelInterface.baseUrl}/${id}`,
            body,
        );
    }
}
