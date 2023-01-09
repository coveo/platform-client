import API from '../../APICore';
import {New, PageModel} from '../BaseInterfaces';
import {IListHostedInterfacesParameters} from '../HostedInterfacesCore';
import Resource from '../Resource';
import {IPXInterfaceConfiguration} from './IPXInterface.model';

export default class IPXInterface extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/ipxinterface/v1/interfaces`;

    list(options?: IListHostedInterfacesParameters) {
        return this.api.get<PageModel<IPXInterfaceConfiguration>>(this.buildPath(IPXInterface.baseUrl, options));
    }

    create(ipInterfaceConfig: New<IPXInterfaceConfiguration>) {
        return this.api.post<IPXInterfaceConfiguration>(IPXInterface.baseUrl, ipInterfaceConfig);
    }

    delete(ipxInterfaceId: string) {
        return this.api.delete(`${IPXInterface.baseUrl}/${ipxInterfaceId}`);
    }

    get(ipxInterfaceId: string) {
        return this.api.get<IPXInterfaceConfiguration>(`${IPXInterface.baseUrl}/${ipxInterfaceId}`);
    }

    update(ipInterfaceConfig: IPXInterfaceConfiguration) {
        const {id, ...body} = ipInterfaceConfig;

        return this.api.put<IPXInterfaceConfiguration>(`${IPXInterface.baseUrl}/${id}`, body);
    }
}
