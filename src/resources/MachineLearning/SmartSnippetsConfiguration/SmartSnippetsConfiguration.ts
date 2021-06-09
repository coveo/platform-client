import API from '../../../APICore';
import {New} from '../../BaseInterfaces';
import Resource from '../../Resource';
import {SmartSnippetsConfigurationModel} from './SmartSnippetsConfigurationInterfaces';

export default class SmartSnippetsConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/smartsnippets/model`;

    create(configModel: New<SmartSnippetsConfigurationModel, 'modelId'>) {
        return this.api.post<SmartSnippetsConfigurationModel>(SmartSnippetsConfiguration.baseUrl, configModel);
    }

    delete(modelId: string) {
        return this.api.delete(`${SmartSnippetsConfiguration.baseUrl}/${modelId}`);
    }

    get(modelId: string) {
        return this.api.get<SmartSnippetsConfigurationModel>(`${SmartSnippetsConfiguration.baseUrl}/${modelId}`);
    }

    update(configModel: SmartSnippetsConfigurationModel) {
        return this.api.put<SmartSnippetsConfigurationModel>(
            `${SmartSnippetsConfiguration.baseUrl}/${configModel.modelId}`,
            configModel
        );
    }
}
