import API from '../../../APICore';
import User from '../User';
import {UserModel} from '../UserInterfaces';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('User', () => {
    let user: User;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        user = new User(api);
    });

    describe('get', () => {
        it('should make a GET call to the User base url', () => {
            user.get('💎');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/users/💎');
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Organization url', () => {
            const userModel = {
                additionalInformation: {},
                username: '🥕',
                displayName: 'carrot',
            } as UserModel;

            user.update('🥕', userModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith('/rest/users/🥕', userModel);
        });
    });

    describe('listRealms', () => {
        it('should make a GET call /rest/organizations/{organizationName}/privileges', () => {
            user.listRealms('🍪');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/users/🍪/realms');
        });
    });
});
