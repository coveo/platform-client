import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {PQSConfigurationModel} from './PQSConfigurationInterfaces.js';

export default class PQSConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/pqs`;

    createPQSModel(model: PQSConfigurationModel) {
        return this.api.post<PQSConfigurationModel>(`${PQSConfiguration.baseUrl}/model`, model);
    }
}
