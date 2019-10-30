import API from '../../../APICore';
import Resource from '../../Resource';
import {RegistrationModel} from '../MachineLearningInterfaces';
import {MLModel} from '../Models/ModelsInterfaces';
import {MLModelInfo} from './ModelInformationInterfaces';

export default class ModelInformation extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/engines`;

    get(engineId: string, modelName: string) {
        return this.api.get<MLModelInfo>(`${ModelInformation.baseUrl}/${engineId}/models/${modelName}/details`);
    }

    delete(engineId: string, modelName: string) {
        return this.api.delete(`${ModelInformation.baseUrl}/${engineId}/models/${modelName}`);
    }

    update(engineId: string, modelName: string, modelInformation: RegistrationModel) {
        return this.api.put<Partial<MLModel>>(
            `${ModelInformation.baseUrl}/${engineId}/models/${modelName}`,
            modelInformation
        );
    }
}
