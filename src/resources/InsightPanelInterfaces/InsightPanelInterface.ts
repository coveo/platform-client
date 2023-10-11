import API from '../../APICore.js';
import {New, PageModel} from '../BaseInterfaces.js';
import {
    ListHostedInterfaceVersionsParams,
    ListHostedInterfacesParams,
    RestoreInterfaceVersionParams,
    UpdateInterfaceVersionLabelParams,
} from '../HostedInterfacesCore/index.js';
import Resource from '../Resource.js';
import {
    InsightPanelInterfaceConfiguration,
    InsightPanelInterfaceConfigurationUpdateParams,
    InsightPanelInterfaceVersion,
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

    listVersions(insightPanelInterfaceId: string, options: ListHostedInterfaceVersionsParams) {
        return this.api.get<PageModel<InsightPanelInterfaceVersion>>(
            this.buildPath(`${InsightPanelInterface.baseUrl}/${insightPanelInterfaceId}/versions`, options),
        );
    }

    getVersion(insightPanelInterfaceId: string, versionNumber: number) {
        return this.api.get<InsightPanelInterfaceVersion>(
            `${InsightPanelInterface.baseUrl}/${insightPanelInterfaceId}/versions/${versionNumber}`,
        );
    }

    restoreVersion(insightPanelInterfaceId: string, versionNumber: number, params: RestoreInterfaceVersionParams) {
        return this.api.post<InsightPanelInterfaceConfiguration>(
            `${InsightPanelInterface.baseUrl}/${insightPanelInterfaceId}/versions/${versionNumber}/restore`,
            params,
        );
    }

    updateVersionLabel(
        insightPanelInterfaceId: string,
        versionNumber: number,
        body: UpdateInterfaceVersionLabelParams,
    ) {
        return this.api.put<InsightPanelInterfaceConfiguration>(
            `${InsightPanelInterface.baseUrl}/${insightPanelInterfaceId}/versions/${versionNumber}/label`,
            body,
        );
    }
}
