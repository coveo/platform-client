import API from '../../APICore';
import {New, PageModel} from '../BaseInterfaces';
import Resource from '../Resource';
import {CaseAssistConfigListOptions, CaseAssistConfigModel} from './CaseAssistConfigInterfaces';

export default class CaseAssistConfig extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/caseassists`;

    list(options?: CaseAssistConfigListOptions) {
        return this.api.get<PageModel<CaseAssistConfigModel>>(this.buildPath(CaseAssistConfig.baseUrl, options));
    }

    create(caseAssistConfig: New<CaseAssistConfigModel>) {
        return this.api.post<CaseAssistConfigModel>(CaseAssistConfig.baseUrl, caseAssistConfig);
    }

    delete(caseAssistConfigId: string) {
        return this.api.delete(`${CaseAssistConfig.baseUrl}/${caseAssistConfigId}`);
    }

    get(caseAssistConfigId: string) {
        return this.api.get<CaseAssistConfigModel>(`${CaseAssistConfig.baseUrl}/${caseAssistConfigId}`);
    }

    update(caseAssistConfig: CaseAssistConfigModel) {
        return this.api.put<CaseAssistConfigModel>(
            `${CaseAssistConfig.baseUrl}/${caseAssistConfig.id}`,
            caseAssistConfig
        );
    }
}
