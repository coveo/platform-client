import API from '../../../APICore';
import Resource from '../../Resource';
import {PQSConfigurationModel} from './PQSConfigurationInterfaces';

export default class PQSConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/pqs`;

    createPQSModel(model: PQSConfigurationModel) {
        return this.api.post<PQSConfigurationModel>(`${PQSConfiguration.baseUrl}/model`, model);
    }
}
