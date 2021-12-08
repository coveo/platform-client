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
    static rootUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/smartsnippets`;
    static baseUrl = `${SmartSnippetsConfiguration.rootUrl}/model`;
    static contentFieldsUrl = `${SmartSnippetsConfiguration.rootUrl}/contentfields`;
    static documentTypesUrl = `${SmartSnippetsConfiguration.rootUrl}/documenttypes`;
    static previewUrl = `${SmartSnippetsConfiguration.rootUrl}/preview`;

    create(configModel: New<SmartSnippetsConfigurationModel, 'modelId'>) {
        return this.api.post<SmartSnippetsConfigurationModel>(SmartSnippetsConfiguration.baseUrl, configModel);
    }

    delete(modelId: string) {
        return this.api.delete(`${SmartSnippetsConfiguration.baseUrl}/${modelId}`);
    }

    get(modelId: string) {
        return this.api.get<SmartSnippetsConfigurationModel>(`${SmartSnippetsConfiguration.baseUrl}/${modelId}`);
    }

    update(configModel: SmartSnippetsConfigurationModel) {
        return this.api.put<SmartSnippetsConfigurationModel>(
            `${SmartSnippetsConfiguration.baseUrl}/${configModel.modelId}`,
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
