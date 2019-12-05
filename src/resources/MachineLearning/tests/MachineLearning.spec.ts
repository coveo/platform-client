import API from '../../../APICore';
import {IntervalUnit} from '../../Enums';
import MachineLearning from '../MachineLearning';
import {RegistrationModel} from '../MachineLearningInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('MachineLearning', () => {
    let ml: MachineLearning;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        ml = new MachineLearning(api);
    });

    describe('register', () => {
        it('should make a POST call to the specific MachineLearning url', () => {
            const registration: RegistrationModel = {
                engineId: 'OvO',
                modelName: 'super model',
                exportPeriod: 'ABC',
                intervalTime: 666,
                intervalUnit: 'DAY' as IntervalUnit,
            };

            ml.register(registration);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(`${MachineLearning.baseUrl}/model`, registration);
        });
    });
});
