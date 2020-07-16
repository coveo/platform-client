import API from '../../APICore';
import {New, PageModel} from '../BaseInterfaces';
import Resource from '../Resource';
import {CaseAssistListOptions, CaseAssistModel} from './CaseAssistInterfaces';

export default class CaseAssist extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/caseassists`;

    list(options?: CaseAssistListOptions) {
        return this.api.get<PageModel<CaseAssistModel>>(this.buildPath(CaseAssist.baseUrl, options));
    }

    create(caseAssist: New<CaseAssistModel>) {
        return this.api.post<CaseAssistModel>(CaseAssist.baseUrl, caseAssist);
    }

    delete(caseAssistId: string) {
        return this.api.delete(`${CaseAssist.baseUrl}/${caseAssistId}`);
    }

    get(caseAssistId: string) {
        return this.api.get<CaseAssistModel>(`${CaseAssist.baseUrl}/${caseAssistId}`);
    }

    update(caseAssist: CaseAssistModel) {
        return this.api.put<CaseAssistModel>(`${CaseAssist.baseUrl}/${caseAssist.id}`, caseAssist);
    }
}
