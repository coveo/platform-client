import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {MLListingModel} from './ModelListingInterfaces.js';

export default class ModelListing extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/modellisting`;

    list(engineIds?: string[]) {
        return this.api.get<MLListingModel[]>(this.buildPath(ModelListing.baseUrl, {engineIds}));
    }
}
