import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {MLModelTypeInfo} from '../index.js';
import {RegistrationModel} from '../MachineLearningInterfaces.js';
import {MLModel} from './ModelsInterfaces.js';

export default class Models extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/models`;

    list(engines?: string[]) {
        const requestUrl = engines?.length
            ? `${Models.baseUrl}?${engines.map((id) => `engines=${encodeURI(id)}`).join('&')}`
            : Models.baseUrl;
        return this.api.get<MLModel[]>(requestUrl);
    }

    listDetails() {
        return this.api.get<Array<MLModel<MLModelTypeInfo>>>(`${Models.baseUrl}/details`);
    }

    getDetails<T extends MLModelTypeInfo>(modelId: string) {
        return this.api.get<MLModel<T>>(`${Models.baseUrl}/${modelId}/details`);
    }

    get(modelId: string) {
        return this.api.get<MLModel>(`${Models.baseUrl}/${modelId}`);
    }

    delete(modelId: string) {
        return this.api.delete(`${Models.baseUrl}/${modelId}`);
    }

    update(modelId: string, update: RegistrationModel) {
        return this.api.put<MLModel>(`${Models.baseUrl}/${modelId}`, update);
    }
}
