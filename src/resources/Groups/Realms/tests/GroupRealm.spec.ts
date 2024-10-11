import API from '../../../../APICore.js';
import {AuthProvider} from '../../../Enums.js';
import GroupRealm from '../GroupRealm.js';
import {RealmModel} from '../GroupRealmInterfaces.js';

jest.mock('../../../../APICore.js');

describe('groupRealm', () => {
    let groupRealm: GroupRealm;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});
    const groupId = '💎';

    beforeEach(() => {
        jest.clearAllMocks();
        groupRealm = new GroupRealm(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the GroupRealm base url', async () => {
            await groupRealm.list(groupId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(GroupRealm.getBaseUrl(groupId));
        });
    });

    describe('add', () => {
        it('should make a POST call to the GroupRealm base url', async () => {
            const realm: RealmModel = {
                id: '🐡',
                displayName: '🐚',
                provider: AuthProvider.GOOGLE,
            };
            await groupRealm.add(groupId, realm);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(GroupRealm.getBaseUrl(groupId), realm);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to /realms/:id', async () => {
            await groupRealm.delete(groupId, '🐢');

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${GroupRealm.getBaseUrl(groupId)}/🐢`);
        });
    });

    describe('get', () => {
        it('should make a GET call to /realms/:id', async () => {
            await groupRealm.get(groupId, '🐟');

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${GroupRealm.getBaseUrl(groupId)}/🐟`);
        });
    });
});
