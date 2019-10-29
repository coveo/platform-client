import API from '../../APICore';
import Resource from '../Resource';
import {CreateMLModelOptions, MLModel, MLModelInfo} from './MLModelsInterfaces';

export default class MLModels extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/models`;
    static createUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/model`;
    static infoUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/engines`;

    list() {
        return this.api.get<MLModel[]>(MLModels.baseUrl);
    }

    listDetails() {
        return this.api.get<MLModel[]>(`${MLModels.baseUrl}/details`);
    }

    getWithId(modelId: string) {
        return this.api.get<MLModelInfo>(`${MLModels.baseUrl}/${modelId}/details`);
    }

    deleteWithId(modelId: string) {
        return this.api.delete(`${MLModels.baseUrl}/${modelId}`);
    }

    create(options: CreateMLModelOptions) {
        return this.api.post<MLModel>(MLModels.createUrl, options);
    }

    getWithInfo(engineId: string, modelName: string) {
        return this.api.get<MLModelInfo>(`${MLModels.infoUrl}/${engineId}/models/${modelName}/details`);
    }

    deleteWithInfo(engineId: string, modelName: string) {
        return this.api.delete(`${MLModels.infoUrl}/${engineId}/models/${modelName}`);
    }

    update(engineId: string, modelName: string, modelInformation: CreateMLModelOptions) {
        return this.api.put<MLModel>(`${MLModels.infoUrl}/${engineId}/models/${modelName}`, modelInformation);
    }
}
