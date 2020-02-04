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
        const currentUser: UserModel = {
            additionalInformation: {},
            username: '🥕',
        } as UserModel;

        beforeEach(() => {
            Object.defineProperty(api, 'currentUser', {
                get: jest.fn(() => currentUser),
            });
        });

        it('should make a PUT call to the specific user url and extend existing current user attributes', () => {
            const userModel: Partial<UserModel> = {
                additionalInformation: {happy: true},
                displayName: 'carrot',
            };

            user.update(userModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                '/rest/users/🥕',
                expect.objectContaining({
                    additionalInformation: {happy: true},
                    displayName: 'carrot',
                    username: '🥕',
                })
            );
        });
    });

    describe('listRealms', () => {
        it('should make a GET call /rest/users/{username}/realms', () => {
            user.listRealms('🍪');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/users/🍪/realms');
        });
    });
});
