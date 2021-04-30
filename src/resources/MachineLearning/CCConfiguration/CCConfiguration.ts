import API from '../../../APICore';
import {New} from '../../BaseInterfaces';
import Resource from '../../Resource';
import {CCConfigurationModel} from './CCConfigurationInterfaces';

export default class CCConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/caseclassif/model`;

    create(configModel: New<CCConfigurationModel>) {
        return this.api.post<CCConfigurationModel>(CCConfiguration.baseUrl, configModel);
    }

    delete(modelId: string) {
        return this.api.delete(`${CCConfiguration.baseUrl}/${modelId}`);
    }

    get(modelId: string) {
        return this.api.get<CCConfigurationModel>(`${CCConfiguration.baseUrl}/${modelId}`);
    }

    update(configModel: CCConfigurationModel) {
        return this.api.put<CCConfigurationModel>(`${CCConfiguration.baseUrl}/${configModel.modelId}`, configModel);
    }
}
