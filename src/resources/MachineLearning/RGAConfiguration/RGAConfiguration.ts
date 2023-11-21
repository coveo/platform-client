import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {RGADocumentGroupPreview, RGAPreviewParams} from './RGAConfigurationInterface.js';

export default class RGAConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/rga`;
    static previewUrl = `${RGAConfiguration.baseUrl}/preview`;

    preview(params: RGAPreviewParams) {
        return this.api.post<RGADocumentGroupPreview>(RGAConfiguration.previewUrl, params);
    }
}
