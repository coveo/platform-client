import API from '../../../APICore';
import Resource from '../../Resource';
import {
    AutoSelectionFieldCandidateModel,
    ListCandidateFieldsParams,
    DocumentExtractionPreviewParams,
    DocumentExtractionPreviewModel,
    DocumentExtractionQueryModel,
    DNENewConfigurationModel,
    DNEConfigurationModel,
} from './DNEConfigurationInterfaces';

export default class DNEConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/dne`;

    listFields(params?: ListCandidateFieldsParams) {
        return this.api.get<AutoSelectionFieldCandidateModel[]>(
            this.buildPath(`${DNEConfiguration.baseUrl}/autoselectionfieldcandidates`, params)
        );
    }

    getDocumentExtractionPreview(params?: DocumentExtractionPreviewParams) {
        return this.api.get<DocumentExtractionPreviewModel>(
            this.buildPath(`${DNEConfiguration.baseUrl}/documentextractionpreview`, params)
        );
    }

    getDocumentExtractionQuery(model: DocumentExtractionQueryModel) {
        return this.api.post<string>(`${DNEConfiguration.baseUrl}/documentextractionquery`, model);
    }

    async createWithoutQuery(
        newModel: DNENewConfigurationModel,
        documentExtractionQueryModel: DocumentExtractionQueryModel
    ) {
        const documentExtractionQuery = await this.getDocumentExtractionQuery(documentExtractionQueryModel);

        return this.api.post<DNEConfigurationModel>(`${DNEConfiguration.baseUrl}/model`, {
            ...newModel,
            documentExtractionQuery,
        });
    }

    createWithQuery(newModel: DNENewConfigurationModel) {
        return this.api.post<DNEConfigurationModel>(`${DNEConfiguration.baseUrl}/model`, newModel);
    }

    delete(modelId: string) {
        return this.api.delete<void>(`${DNEConfiguration.baseUrl}/model/${modelId}`);
    }

    get(modelId: string) {
        return this.api.get<DNEConfigurationModel>(`${DNEConfiguration.baseUrl}/model/${modelId}`);
    }

    update(modelId: string, modelConfig: DNEConfigurationModel) {
        return this.api.put<DNEConfigurationModel>(`${DNEConfiguration.baseUrl}/model/${modelId}`, modelConfig);
    }
}
