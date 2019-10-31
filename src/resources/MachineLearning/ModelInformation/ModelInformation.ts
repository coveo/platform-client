import API from '../../../APICore';
import Resource from '../../Resource';
import {RegistrationModel} from '../MachineLearningInterfaces';
import {MLModel} from '../Models/ModelsInterfaces';
import {MLModelInfo} from './ModelInformationInterfaces';

export default class ModelInformation extends Resource {
    static getBaseUrl = (engineId: string, modelName: string) =>
        `/rest/organizations/${API.orgPlaceholder}/machinelearning/engines/${engineId}/models/${modelName}`;

    get(engineId: string, modelName: string) {
        return this.api.get<MLModelInfo>(`${ModelInformation.getBaseUrl(engineId, modelName)}/details`);
    }

    delete(engineId: string, modelName: string) {
        return this.api.delete(ModelInformation.getBaseUrl(engineId, modelName));
    }

    update(engineId: string, modelName: string, modelInformation: RegistrationModel) {
        return this.api.put<Partial<MLModel>>(ModelInformation.getBaseUrl(engineId, modelName), modelInformation);
    }
}
