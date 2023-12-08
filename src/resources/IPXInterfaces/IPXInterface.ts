import API from '../../APICore.js';
import {New, PageModel} from '../BaseInterfaces.js';
import {ListHostedInterfacesParams} from '../HostedInterfacesCore/index.js';
import Resource from '../Resource.js';
import {IPXInterfaceConfiguration} from './IPXInterface.model.js';

export default class IPXInterface extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/ipxinterface/v1/interfaces`;

    list(options?: ListHostedInterfacesParams) {
        return this.api.get<PageModel<IPXInterfaceConfiguration>>(this.buildPath(IPXInterface.baseUrl, options));
    }

    create(ipxInterfaceConfig: New<IPXInterfaceConfiguration>) {
        return this.api.post<IPXInterfaceConfiguration>(IPXInterface.baseUrl, ipxInterfaceConfig);
    }

    delete(ipxInterfaceId: string) {
        return this.api.delete(`${IPXInterface.baseUrl}/${ipxInterfaceId}`);
    }

    get(ipxInterfaceId: string) {
        return this.api.get<IPXInterfaceConfiguration>(`${IPXInterface.baseUrl}/${ipxInterfaceId}`);
    }

    update(ipxInterfaceConfig: IPXInterfaceConfiguration) {
        const {id, ...body} = ipxInterfaceConfig;

        return this.api.put<IPXInterfaceConfiguration>(`${IPXInterface.baseUrl}/${id}`, body);
    }

    getLoader(ipxInterfaceId: string) {
        return this.api.get<IPXInterfaceConfiguration>(`${IPXInterface.baseUrl}/${ipxInterfaceId}/loader`);
    }

    generatePreview(ipxInterfaceConfig: IPXInterfaceConfiguration) {
        return this.api.post<string>(`${IPXInterface.baseUrl}/${ipxInterfaceConfig.id}/preview`, ipxInterfaceConfig);
    }

    getEditInterface(ipxInterfaceId: string) {
        return this.api.get<string>(`${IPXInterface.baseUrl}/${ipxInterfaceId}/edit`);
    }

    getLoginPage(ipxInterfaceId: string) {
        return this.api.get<string>(`${IPXInterface.baseUrl}/${ipxInterfaceId}/login`);
    }

    getToken(ipxInterfaceId: string) {
        return this.api.get<{token: string}>(`${IPXInterface.baseUrl}/${ipxInterfaceId}/token`);
    }
}
