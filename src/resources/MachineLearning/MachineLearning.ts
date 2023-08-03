import API from '../../APICore.js';
import Resource from '../Resource.js';
import CaseClassificationConfiguration from './CaseClassificationConfiguration/CaseClassificationConfiguration.js';
import DNEConfiguration from './DNEConfiguration/DNEConfiguration.js';
import SmartSnippetsConfiguration from './SmartSnippetsConfiguration/SmartSnippetsConfiguration.js';
import {MLModelCreated, RegistrationModel} from './MachineLearningInterfaces.js';
import Models from './Models/Models.js';
import PQSConfiguration from './PQSConfiguration/PQSConfiguration.js';
import UserActionHistoryConfiguration from './UserActionHistoryConfiguration/UserActionHistoryConfiguration.js';
import IAPRConfiguration from './IAPRConfiguration/IAPRConfiguration.js';

export default class MachineLearning extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning`;

    models: Models;
    dneConfig: DNEConfiguration;
    caseClassificationConfig: CaseClassificationConfiguration;
    smartSnippetsConfig: SmartSnippetsConfiguration;
    userActionHistoryConfig: UserActionHistoryConfiguration;
    pqsConfig: PQSConfiguration;
    iaprConfig: IAPRConfiguration;

    constructor(
        protected api: API,
        protected serverlessApi: API,
    ) {
        super(api, serverlessApi);

        this.models = new Models(api, serverlessApi);
        this.dneConfig = new DNEConfiguration(api, serverlessApi);
        this.caseClassificationConfig = new CaseClassificationConfiguration(api, serverlessApi);
        this.smartSnippetsConfig = new SmartSnippetsConfiguration(api, serverlessApi);
        this.pqsConfig = new PQSConfiguration(api, serverlessApi);
        this.iaprConfig = new IAPRConfiguration(api, serverlessApi);
        this.userActionHistoryConfig = new UserActionHistoryConfiguration(api, serverlessApi);
    }

    register(registration: RegistrationModel) {
        return this.api.post<MLModelCreated>(`${MachineLearning.baseUrl}/model`, registration);
    }
}
