import API from '../../../APICore.js';
import User from '../User.js';
import {UserModel} from '../UserInterfaces.js';

jest.mock('../../../APICore.js');

describe('User', () => {
    let user: User;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        user = new User(api, serverlessApi);
    });

    describe('get', () => {
        it('should make a GET call to the User base url', async () => {
            await user.get('💎');
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

        it('should make a PUT call to the specific user url and extend existing current user attributes', async () => {
            const userModel: Partial<UserModel> = {
                additionalInformation: {happy: 'true'},
                displayName: 'carrot',
            };

            await user.update(userModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(
                '/rest/users/🥕',
                expect.objectContaining({
                    additionalInformation: {happy: 'true'},
                    displayName: 'carrot',
                    username: '🥕',
                }),
            );
        });
    });

    describe('listRealms', () => {
        it('should make a GET call /rest/users/{username}/realms', async () => {
            await user.listRealms('🍪');
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/users/🍪/realms');
        });
    });
});
