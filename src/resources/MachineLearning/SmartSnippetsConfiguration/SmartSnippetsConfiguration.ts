import API from '../../../APICore';
import {New} from '../../BaseInterfaces';
import Resource from '../../Resource';
import {
    SmartSnippetsConfigurationModel,
    SmartSnippetsContentFields,
    SmartSnippetsContentFieldsParams,
    SmartSnippetsDocumentGroupPreview,
    SmartSnippetsDocumentGroupPreviewParams,
    SmartSnippetsDocumentTypes,
    SmartSnippetsDocumentTypesParams,
} from './SmartSnippetsConfigurationInterfaces';

export default class SmartSnippetsConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/smartsnippets`;
    static modelUrl = `${SmartSnippetsConfiguration.baseUrl}/model`;
    static contentFieldsUrl = `${SmartSnippetsConfiguration.baseUrl}/contentfields`;
    static documentTypesUrl = `${SmartSnippetsConfiguration.baseUrl}/documenttypes`;
    static previewUrl = `${SmartSnippetsConfiguration.baseUrl}/preview`;

    create(configModel: New<SmartSnippetsConfigurationModel, 'modelId'>) {
        return this.api.post<SmartSnippetsConfigurationModel>(SmartSnippetsConfiguration.modelUrl, configModel);
    }

    delete(modelId: string) {
        return this.api.delete(`${SmartSnippetsConfiguration.modelUrl}/${modelId}`);
    }

    get(modelId: string) {
        return this.api.get<SmartSnippetsConfigurationModel>(`${SmartSnippetsConfiguration.modelUrl}/${modelId}`);
    }

    update(configModel: SmartSnippetsConfigurationModel) {
        return this.api.put<SmartSnippetsConfigurationModel>(
            `${SmartSnippetsConfiguration.modelUrl}/${configModel.modelId}`,
            configModel
        );
    }

    contentFields(params: SmartSnippetsContentFieldsParams) {
        return this.api.post<SmartSnippetsContentFields>(SmartSnippetsConfiguration.contentFieldsUrl, params);
    }

    documentTypes(params: SmartSnippetsDocumentTypesParams) {
        return this.api.post<SmartSnippetsDocumentTypes>(SmartSnippetsConfiguration.documentTypesUrl, params);
    }

    preview(params: SmartSnippetsDocumentGroupPreviewParams) {
        return this.api.post<SmartSnippetsDocumentGroupPreview>(SmartSnippetsConfiguration.previewUrl, params);
    }
}
