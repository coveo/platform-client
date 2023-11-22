import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {
    RelevanceGenerativeAnsweringPreviewParams,
    RelevanceGenerativeAnsweringDocumentGroupPreview,
} from './RelevanceGenerativeAnsweringConfigurationInterface.js';

export default class RelevanceGenerativeAnsweringConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/rga`;
    static previewUrl = `${RelevanceGenerativeAnsweringConfiguration.baseUrl}/preview`;

    preview(params: RelevanceGenerativeAnsweringPreviewParams) {
        return this.api.post<RelevanceGenerativeAnsweringDocumentGroupPreview>(
            RelevanceGenerativeAnsweringConfiguration.previewUrl,
            params,
        );
    }
}
