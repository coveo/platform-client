import API from '../../APICore';
import {New, PageModel} from '../BaseInterfaces';
import Resource from '../Resource';
import {IListIPInterfacesParameters, IPInterfaceConfiguration} from './InsightPanelInterface.model';

export default class InsightPanelInterface extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/insightinterfaces/v1/interfaces`;

    list(options?: IListIPInterfacesParameters) {
        return this.api.get<PageModel<IPInterfaceConfiguration>>(
            this.buildPath(InsightPanelInterface.baseUrl, options)
        );
    }

    create(ipInterfaceConfig: New<IPInterfaceConfiguration>) {
        return this.api.post<IPInterfaceConfiguration>(InsightPanelInterface.baseUrl, ipInterfaceConfig);
    }

    delete(insightPanelInterfaceId: string) {
        return this.api.delete(`${InsightPanelInterface.baseUrl}/${insightPanelInterfaceId}`);
    }

    get(insightPanelInterfaceId: string) {
        return this.api.get<IPInterfaceConfiguration>(`${InsightPanelInterface.baseUrl}/${insightPanelInterfaceId}`);
    }

    update(ipInterfaceConfig: IPInterfaceConfiguration) {
        const {id, ...body} = ipInterfaceConfig;

        return this.api.put<IPInterfaceConfiguration>(`${InsightPanelInterface.baseUrl}/${id}`, body);
    }
}
