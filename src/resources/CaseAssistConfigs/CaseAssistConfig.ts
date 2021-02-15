import API from '../../APICore';
import {New, PageModel} from '../BaseInterfaces';
import Resource from '../Resource';
import {
    CaseAssistConfigListOptions,
    CaseAssistConfigModel,
    ClassifyRequestBody,
    DocumentsSuggestRequestBody,
} from './CaseAssistConfigInterfaces';
import {PreviewRequestBody, DocumentSuggestions, CaseClassifications} from './CaseAssistPreviewInterfaces';

export default class CaseAssistConfig extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/caseassists`;

    list(options?: CaseAssistConfigListOptions) {
        return this.api.get<PageModel<CaseAssistConfigModel, 'configurations'>>(
            this.buildPath(CaseAssistConfig.baseUrl, options)
        );
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

    classify(caseAssistConfigId: string, body: ClassifyRequestBody) {
        return this.api.post<CaseClassifications>(`${CaseAssistConfig.baseUrl}/${caseAssistConfigId}/classify`, body);
    }

    suggestDocuments(caseAssistConfigId: string, body: DocumentsSuggestRequestBody) {
        return this.api.post<DocumentSuggestions>(
            `${CaseAssistConfig.baseUrl}/${caseAssistConfigId}/documents/suggest`,
            body
        );
    }

    previewDocumentSuggestion(body: PreviewRequestBody) {
        return this.api.post<DocumentSuggestions>(`${CaseAssistConfig.baseUrl}/preview/documents/suggest`, body);
    }

    previewCaseClassication(body: PreviewRequestBody) {
        return this.api.post<CaseClassifications>(`${CaseAssistConfig.baseUrl}/preview/classify`, body);
    }
}
