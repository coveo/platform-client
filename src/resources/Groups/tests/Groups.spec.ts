import API from '../../../APICore';
import {New} from '../../BaseInterfaces';
import Group from '../Groups';
import {GroupModel} from '../GroupsInterfaces';
import GroupRealm from '../Realms/GroupRealm';

jest.mock('../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('Group', () => {
    let group: Group;
    const api = new APIMock() as jest.Mocked<API>;

    beforeEach(() => {
        jest.clearAllMocks();
        group = new Group(api);
    });

    describe('list', () => {
        it('should make a GET call to the Groups base url', () => {
            group.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Group.baseUrl);
        });
    });

    describe('create', () => {
        it('should make a POST call to the Groups base url', () => {
            const groupModel: New<GroupModel> = {
                displayName: 'My new group',
            };

            group.create(groupModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Group.baseUrl, groupModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Group url', () => {
            const groupToDeleteId = 'Group-to-be-deleted';
            group.delete(groupToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Group.baseUrl}/${groupToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Group url', () => {
            const groupToGetId = 'Group-to-be-fetched';
            group.get(groupToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Group.baseUrl}/${groupToGetId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Group url', () => {
            const groupModel: GroupModel = {
                id: 'group-to-update-id',
                displayName: 'Group to be updated',
            };

            group.update(groupModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Group.baseUrl}/${groupModel.id}`, groupModel);
        });
    });

    it('should register the realm resource', () => {
        expect(group.realm).toBeDefined();
        expect(group.realm).toBeInstanceOf(GroupRealm);
    });
});
