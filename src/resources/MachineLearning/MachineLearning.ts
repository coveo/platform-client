import API from '../../APICore';
import Resource from '../Resource';
import CaseClassificationConfiguration from './CaseClassificationConfiguration/CaseClassificationConfiguration';
import DNEConfiguration from './DNEConfiguration/DNEConfiguration';
import {MLModelCreated, RegistrationModel} from './MachineLearningInterfaces';
import ModelConfiguration from './ModelConfiguration/ModelConfiguration';
import ModelInformation from './ModelInformation/ModelInformation';
import Models from './Models/Models';

export default class MachineLearning extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning`;

    models: Models;
    modelInfo: ModelInformation;
    modelConfig: ModelConfiguration;
    dneConfig: DNEConfiguration;
    caseClassificationConfig: CaseClassificationConfiguration;

    constructor(protected api: API, protected serverlessApi: API) {
        super(api, serverlessApi);

        this.models = new Models(api, serverlessApi);
        this.modelInfo = new ModelInformation(api, serverlessApi);
        this.modelConfig = new ModelConfiguration(api, serverlessApi);
        this.dneConfig = new DNEConfiguration(api, serverlessApi);
        this.caseClassificationConfig = new CaseClassificationConfiguration(api, serverlessApi);
    }

    register(registration: RegistrationModel) {
        return this.api.post<MLModelCreated>(`${MachineLearning.baseUrl}/model`, registration);
    }
}
