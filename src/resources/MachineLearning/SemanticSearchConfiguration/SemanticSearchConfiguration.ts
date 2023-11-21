import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {
    SemanticSearchDocumentGroupPreview,
    SemanticSearchDocumentGroupPreviewParams,
} from './SemanticSearchConfigurationInterfaces.js';

export default class SemanticSearchConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/ses`;
    static previewUrl = `${SemanticSearchConfiguration.baseUrl}/preview`;

    preview(params: SemanticSearchDocumentGroupPreviewParams) {
        return this.api.post<SemanticSearchDocumentGroupPreview>(SemanticSearchConfiguration.previewUrl, params);
    }
}
