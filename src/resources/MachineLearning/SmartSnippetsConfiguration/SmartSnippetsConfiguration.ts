import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {DocumentGroupPreviewParams} from '../DocumentInterfaces.js';
import {
    SmartSnippetsContentFields,
    SmartSnippetsContentFieldsParams,
    SmartSnippetsDocumentGroupPreview,
    SmartSnippetsDocumentTypes,
    SmartSnippetsDocumentTypesParams,
} from './SmartSnippetsConfigurationInterfaces.js';

export default class SmartSnippetsConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/smartsnippets`;
    static contentFieldsUrl = `${SmartSnippetsConfiguration.baseUrl}/contentfields`;
    static documentTypesUrl = `${SmartSnippetsConfiguration.baseUrl}/documenttypes`;
    static previewUrl = `${SmartSnippetsConfiguration.baseUrl}/preview`;

    contentFields(params: SmartSnippetsContentFieldsParams) {
        return this.api.post<SmartSnippetsContentFields>(SmartSnippetsConfiguration.contentFieldsUrl, params);
    }

    documentTypes(params: SmartSnippetsDocumentTypesParams) {
        return this.api.post<SmartSnippetsDocumentTypes>(SmartSnippetsConfiguration.documentTypesUrl, params);
    }

    preview(params: DocumentGroupPreviewParams) {
        return this.api.post<SmartSnippetsDocumentGroupPreview>(SmartSnippetsConfiguration.previewUrl, params);
    }
}
