import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {ModelWithDetails} from './ModelDetailedInfoInterfaces.js';

export default class ModelDetailedInfo extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/modeldetailedinfo`;

    get(modelId: string) {
        return this.api.get<ModelWithDetails>(`${ModelDetailedInfo.baseUrl}/${modelId}`);
    }
}
