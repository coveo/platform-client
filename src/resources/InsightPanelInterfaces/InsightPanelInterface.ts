import API from '../../APICore';
import {New, PageModel} from '../BaseInterfaces';
import {ListHostedInterfacesParams} from '../HostedInterfacesCore';
import Resource from '../Resource';
import {InsightPanelInterfaceConfiguration} from './InsightPanelInterface.model';

export default class InsightPanelInterface extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/insightinterface/v1/interfaces`;

    list(options?: ListHostedInterfacesParams) {
        return this.api.get<PageModel<InsightPanelInterfaceConfiguration>>(
            this.buildPath(InsightPanelInterface.baseUrl, options)
        );
    }

    create(ipInterfaceConfig: New<InsightPanelInterfaceConfiguration>) {
        return this.api.post<InsightPanelInterfaceConfiguration>(InsightPanelInterface.baseUrl, ipInterfaceConfig);
    }

    delete(insightPanelInterfaceId: string) {
        return this.api.delete(`${InsightPanelInterface.baseUrl}/${insightPanelInterfaceId}`);
    }

    get(insightPanelInterfaceId: string) {
        return this.api.get<InsightPanelInterfaceConfiguration>(
            `${InsightPanelInterface.baseUrl}/${insightPanelInterfaceId}`
        );
    }

    update(ipInterfaceConfig: InsightPanelInterfaceConfiguration) {
        const {id, ...body} = ipInterfaceConfig;

        return this.api.put<InsightPanelInterfaceConfiguration>(`${InsightPanelInterface.baseUrl}/${id}`, body);
    }
}
