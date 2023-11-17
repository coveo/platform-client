import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {SESDocumentGroupPreviewParams, SESDocumentGroupPreview} from './SESConfigurationInterfaces.js';

export default class SESConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/ses`;
    static previewUrl = `${SESConfiguration.baseUrl}/preview`;

    preview(params: SESDocumentGroupPreviewParams) {
        return this.api.post<SESDocumentGroupPreview>(SESConfiguration.previewUrl, params);
    }
}
