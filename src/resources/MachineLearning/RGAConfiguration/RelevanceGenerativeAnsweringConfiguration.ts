import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {
    RelevanceGenerativeAnsweringPreviewParams,
    RelevanceGenerativeAnsweringDocumentGroupPreview,
} from './RGAConfigurationInterface.js';

export default class RGAConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/rga`;
    static previewUrl = `${RGAConfiguration.baseUrl}/preview`;

    preview(params: RelevanceGenerativeAnsweringPreviewParams) {
        return this.api.post<RelevanceGenerativeAnsweringDocumentGroupPreview>(RGAConfiguration.previewUrl, params);
    }
}
