import API from '../../../../APICore';
import {AuthProvider} from '../../../Enums';
import GroupRealm from '../GroupRealm';
import {RealmModel} from '../GroupRealmInterfaces';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('groupRealm', () => {
    let groupRealm: GroupRealm;
    const api = new APIMock() as jest.Mocked<API>;
    const serverlessApi = new APIMock() as jest.Mocked<API>;
    const groupId = '💎';

    beforeEach(() => {
        jest.clearAllMocks();
        groupRealm = new GroupRealm(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the GroupRealm base url', () => {
            groupRealm.list(groupId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(GroupRealm.getBaseUrl(groupId));
        });
    });

    describe('add', () => {
        it('should make a POST call to the GroupRealm base url', () => {
            const realm: RealmModel = {
                id: '🐡',
                displayName: '🐚',
                provider: AuthProvider.GOOGLE,
            };
            groupRealm.add(groupId, realm);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(GroupRealm.getBaseUrl(groupId), realm);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to /realms/:id', () => {
            groupRealm.delete(groupId, '🐢');

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${GroupRealm.getBaseUrl(groupId)}/🐢`);
        });
    });

    describe('get', () => {
        it('should make a GET call to /realms/:id', () => {
            groupRealm.get(groupId, '🐟');

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${GroupRealm.getBaseUrl(groupId)}/🐟`);
        });
    });
});
