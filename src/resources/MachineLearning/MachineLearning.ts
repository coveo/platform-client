import API from '../../APICore.js';
import Resource from '../Resource.js';
import CaseClassificationConfiguration from './CaseClassificationConfiguration/CaseClassificationConfiguration.js';
import DNEConfiguration from './DNEConfiguration/DNEConfiguration.js';
import IAPRConfiguration from './IAPRConfiguration/IAPRConfiguration.js';
import {MLModelCreated, RegistrationModel} from './MachineLearningInterfaces.js';
import ModelDetailedInfo from './ModelDetailedInfo/ModelDetailedInfo.js';
import ModelListing from './ModelListing/ModelListing.js';
import Models from './Models/Models.js';
import PQSConfiguration from './PQSConfiguration/PQSConfiguration.js';
import RelevanceGenerativeAnsweringConfiguration from './RGAConfiguration/RelevanceGenerativeAnsweringConfiguration.js';
import SemanticEncoderConfiguration from './SemanticEncoderConfiguration/SemanticEncoderConfiguration.js';
import SmartSnippetsConfiguration from './SmartSnippetsConfiguration/SmartSnippetsConfiguration.js';
import UserActionHistoryConfiguration from './UserActionHistoryConfiguration/UserActionHistoryConfiguration.js';

export default class MachineLearning extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning`;

    models: Models;
    dneConfig: DNEConfiguration;
    caseClassificationConfig: CaseClassificationConfiguration;
    smartSnippetsConfig: SmartSnippetsConfiguration;
    userActionHistoryConfig: UserActionHistoryConfiguration;
    pqsConfig: PQSConfiguration;
    iaprConfig: IAPRConfiguration;
    modelListing: ModelListing;
    relevanceGenerativeAnsweringConfig: RelevanceGenerativeAnsweringConfiguration;
    semanticEncoderConfig: SemanticEncoderConfiguration;
    modelDetailedInfo: ModelDetailedInfo;

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
        this.modelListing = new ModelListing(api, serverlessApi);
        this.relevanceGenerativeAnsweringConfig = new RelevanceGenerativeAnsweringConfiguration(api, serverlessApi);
        this.semanticEncoderConfig = new SemanticEncoderConfiguration(api, serverlessApi);
        this.modelDetailedInfo = new ModelDetailedInfo(api, serverlessApi);
    }

    register(registration: RegistrationModel) {
        return this.api.post<MLModelCreated>(`${MachineLearning.baseUrl}/model`, registration);
    }
}
