import API from '../../../APICore.js';
import {IntervalUnit} from '../../Enums.js';
import DNEConfiguration from '../DNEConfiguration/DNEConfiguration.js';
import MachineLearning from '../MachineLearning.js';
import {RegistrationModel} from '../MachineLearningInterfaces.js';
import ModelInformation from '../ModelInformation/ModelInformation.js';
import Models from '../Models/Models.js';
import PQSConfiguration from '../PQSConfiguration/PQSConfiguration.js';
import SmartSnippetsConfiguration from '../SmartSnippetsConfiguration/SmartSnippetsConfiguration.js';
import UserActionHistoryConfiguration from '../UserActionHistoryConfiguration/UserActionHistoryConfiguration.js';

jest.mock('../../../APICore.js');

const APIMock: jest.Mock<API> = API as any;

describe('MachineLearning', () => {
    let ml: MachineLearning;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        ml = new MachineLearning(api, serverlessApi);
    });

    describe('register', () => {
        it('should make a POST call to the specific MachineLearning url', () => {
            const registration: RegistrationModel = {
                engineId: 'OvO',
                modelName: 'super model',
                exportPeriod: 'ABC',
                intervalTime: 666,
                intervalUnit: IntervalUnit.DAY,
            };

            ml.register(registration);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${MachineLearning.baseUrl}/model`, registration);
        });
    });

    it('should register the models resource', () => {
        expect(ml.models).toBeDefined();
        expect(ml.models).toBeInstanceOf(Models);
    });

    it('should register the modelInfo resource', () => {
        expect(ml.modelInfo).toBeDefined();
        expect(ml.modelInfo).toBeInstanceOf(ModelInformation);
    });

    it('should register the dneConfig resource', () => {
        expect(ml.dneConfig).toBeDefined();
        expect(ml.dneConfig).toBeInstanceOf(DNEConfiguration);
    });

    it('should register the smartSnippetsConfig resource', () => {
        expect(ml.smartSnippetsConfig).toBeDefined();
        expect(ml.smartSnippetsConfig).toBeInstanceOf(SmartSnippetsConfiguration);
    });

    it('should register the pqsConfig resource', () => {
        expect(ml.pqsConfig).toBeDefined();
        expect(ml.pqsConfig).toBeInstanceOf(PQSConfiguration);
    });

    it('should register the userActionHistory resource', () => {
        expect(ml.userActionHistoryConfig).toBeDefined();
        expect(ml.userActionHistoryConfig).toBeInstanceOf(UserActionHistoryConfiguration);
    });
});
