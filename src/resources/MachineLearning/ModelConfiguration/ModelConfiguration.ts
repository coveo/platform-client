import API from '../../../APICore';
import {ModelConfigFileType} from '../../Enums';
import Resource from '../../Resource';
import {
    AdvancedRegistrationConfigFile,
    AdvancedRegistrationConfigFileCreationResponse,
    ModelConfigurationUpdateArgs,
} from './ModelConfigurationInterfaces';

export default class ModelConfiguration extends Resource {
    static getBaseUrl = (modelId: string, modelConfigFileType: ModelConfigFileType) =>
        `/rest/organizations/${API.orgPlaceholder}/machinelearning/models/${modelId}/configs/${modelConfigFileType}`;

    get(modelId: string, modelConfigFileType: ModelConfigFileType, languageCode?: string) {
        return this.api.get<AdvancedRegistrationConfigFile>(
            this.buildPath(ModelConfiguration.getBaseUrl(modelId, modelConfigFileType), {languageCode})
        );
    }

    update(
        modelId: string,
        modelConfigFileType: ModelConfigFileType,
        {modelConfigFileContents, languageCode}: ModelConfigurationUpdateArgs
    ) {
        return this.api.put<AdvancedRegistrationConfigFileCreationResponse>(
            this.buildPath(ModelConfiguration.getBaseUrl(modelId, modelConfigFileType), {languageCode}),
            modelConfigFileContents,
            {method: 'put', body: modelConfigFileContents, headers: {'Content-Type': 'text/plain'}}
        );
    }
}
