import API from '../../../APICore';
import Resource from '../../Resource';
import {
    AdvancedRegistrationConfigFile,
    AdvancedRegistrationConfigFileCreationResponse,
} from './ModelConfigurationInterfaces';

export default class ModelConfiguration extends Resource {
    static getBaseUrl = (modelId: string) =>
        `/rest/organizations/${API.orgPlaceholder}/machinelearning/models/${modelId}/configs`;

    getAdvancedConfig(modelId: string) {
        return this.api.get<AdvancedRegistrationConfigFile>(`${ModelConfiguration.getBaseUrl(modelId)}/advanced`);
    }

    updateAdvancedConfig(modelId: string, modelConfigFileContents: string) {
        return this.api.put<AdvancedRegistrationConfigFileCreationResponse>(
            `${ModelConfiguration.getBaseUrl(modelId)}/advanced`,
            modelConfigFileContents,
            {method: 'put', body: modelConfigFileContents, headers: {'Content-Type': 'application/json'}}
        );
    }
}
