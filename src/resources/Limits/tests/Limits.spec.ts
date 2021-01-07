import {LicenseSection} from '../..';
import API from '../../../APICore';
import Limits from '../Limits';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Limits', () => {
    let limits: Limits;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        limits = new Limits(api, serverlessApi);
    });

    describe('get', () => {
        it('should make a GET call to the specific part of the limits', () => {
            limits.get(LicenseSection.content);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/limits/content`);
        });
    });

    describe('getAll', () => {
        it('should make a GET call to get all limits', () => {
            limits.getAll();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`/rest/organizations/{organizationName}/limits`);
        });
    });
});
