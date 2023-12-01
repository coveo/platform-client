import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {DocumentGroupPreviewParams} from '../DocumentInterfaces.js';
import {SemanticEncoderDocumentGroupPreview} from './SemanticEncoderConfigurationInterfaces.js';

export default class SemanticEncoderConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/semanticencoder`;
    static previewUrl = `${SemanticEncoderConfiguration.baseUrl}/preview`;

    preview(params: DocumentGroupPreviewParams) {
        return this.api.post<SemanticEncoderDocumentGroupPreview>(SemanticEncoderConfiguration.previewUrl, params);
    }
}
