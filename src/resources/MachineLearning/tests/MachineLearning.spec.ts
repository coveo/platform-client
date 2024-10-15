import API from '../../../APICore.js';
import {IntervalUnit} from '../../Enums.js';
import DNEConfiguration from '../DNEConfiguration/DNEConfiguration.js';
import IAPRConfiguration from '../IAPRConfiguration/IAPRConfiguration.js';
import MachineLearning from '../MachineLearning.js';
import {RegistrationModel} from '../MachineLearningInterfaces.js';
import ModelDetailedInfo from '../ModelDetailedInfo/ModelDetailedInfo.js';
import Models from '../Models/Models.js';
import PQSConfiguration from '../PQSConfiguration/PQSConfiguration.js';
import SmartSnippetsConfiguration from '../SmartSnippetsConfiguration/SmartSnippetsConfiguration.js';
import UserActionHistoryConfiguration from '../UserActionHistoryConfiguration/UserActionHistoryConfiguration.js';

jest.mock('../../../APICore.js');

describe('MachineLearning', () => {
    let ml: MachineLearning;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        ml = new MachineLearning(api, serverlessApi);
    });

    describe('register', () => {
        it('should make a POST call to the specific MachineLearning url', async () => {
            const registration: RegistrationModel = {
                engineId: 'OvO',
                modelName: 'super model',
                exportPeriod: 'ABC',
                intervalTime: 666,
                intervalUnit: IntervalUnit.DAY,
            };

            await ml.register(registration);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${MachineLearning.baseUrl}/model`, registration);
        });
    });

    it('should register the models resource', () => {
        expect(ml.models).toBeDefined();
        expect(ml.models).toBeInstanceOf(Models);
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

    it('should register the iaprConfig resource', () => {
        expect(ml.iaprConfig).toBeDefined();
        expect(ml.iaprConfig).toBeInstanceOf(IAPRConfiguration);
    });

    it('should register the modelDetailedInfo resource', () => {
        expect(ml.modelDetailedInfo).toBeDefined();
        expect(ml.modelDetailedInfo).toBeInstanceOf(ModelDetailedInfo);
    });
});
