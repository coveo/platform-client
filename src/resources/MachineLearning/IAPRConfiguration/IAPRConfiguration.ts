import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {IAPRConfigurationModel} from './IAPRConfigurationInterfaces.js';

export default class IAPRConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/iapr`;

    create(model: IAPRConfigurationModel) {
        return this.api.post<IAPRConfigurationModel>(`${IAPRConfiguration.baseUrl}/model`, model);
    }
}
