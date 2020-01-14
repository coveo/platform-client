import API from '../../APICore';
import Resource from '../Resource';
import {MLModelCreated, RegistrationModel} from './MachineLearningInterfaces';
import ModelConfiguration from './ModelConfiguration/ModelConfiguration';
import ModelInformation from './ModelInformation/ModelInformation';
import Models from './Models/Models';

export default class MachineLearning extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning`;

    models: Models;
    modelInfo: ModelInformation;
    modelConfig: ModelConfiguration;

    constructor(protected api: API) {
        super(api);

        this.models = new Models(api);
        this.modelInfo = new ModelInformation(api);
        this.modelConfig = new ModelConfiguration(api);
    }

    register(registration: RegistrationModel) {
        return this.api.post<MLModelCreated>(`${MachineLearning.baseUrl}/model`, registration);
    }
}
