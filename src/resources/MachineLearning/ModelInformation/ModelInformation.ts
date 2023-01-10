import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {RegistrationModel} from '../MachineLearningInterfaces.js';
import {MLModelInfo, MLModelTypeInfo} from './ModelInformationInterfaces.js';
import {MLModel} from '../Models/index.js';

export default class ModelInformation extends Resource {
    static getBaseUrl = (engineId: string, modelName: string) =>
        `/rest/organizations/${API.orgPlaceholder}/machinelearning/engines/${engineId}/models/${modelName}`;

    get<T extends MLModelTypeInfo>(engineId: string, modelName: string) {
        return this.api.get<MLModelInfo<T>>(`${ModelInformation.getBaseUrl(engineId, modelName)}/details`);
    }

    delete(engineId: string, modelName: string) {
        return this.api.delete(ModelInformation.getBaseUrl(engineId, modelName));
    }

    update(engineId: string, modelName: string, modelInformation: RegistrationModel) {
        return this.api.put<Partial<MLModel>>(ModelInformation.getBaseUrl(engineId, modelName), modelInformation);
    }
}
