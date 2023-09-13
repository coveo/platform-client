import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {MLListingModel} from './ModelListingConfiguration.js';

export default class ModelListing extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/modelslisting`;

    list(engineIds?: string[]) {
        const requestUrl = engineIds?.length
            ? `${ModelListing.baseUrl}?${engineIds.map((id) => `engineId=${encodeURI(id)}`).join('&')}`
            : ModelListing.baseUrl;
        return this.api.get<MLListingModel[]>(requestUrl);
    }
}
