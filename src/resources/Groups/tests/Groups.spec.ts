import API from '../../../APICore.js';
import {New} from '../../BaseInterfaces.js';
import Group from '../Groups.js';
import {GroupModel} from '../GroupsInterfaces.js';
import GroupInvite from '../Invites/GroupInvite.js';
import GroupMember from '../Members/GroupMember.js';
import GroupRealm from '../Realms/GroupRealm.js';

jest.mock('../../../APICore.js');

describe('Group', () => {
    let group: Group;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});

    beforeEach(() => {
        jest.clearAllMocks();
        group = new Group(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the Groups base url', async () => {
            await group.list();
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(Group.baseUrl);
        });
    });

    describe('create', () => {
        it('should make a POST call to the Groups base url', async () => {
            const groupModel: New<GroupModel> = {
                displayName: 'My new group',
            };

            await group.create(groupModel);
            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(Group.baseUrl, groupModel);
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to the specific Group url', async () => {
            const groupToDeleteId = 'Group-to-be-deleted';
            await group.delete(groupToDeleteId);
            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith(`${Group.baseUrl}/${groupToDeleteId}`);
        });
    });

    describe('get', () => {
        it('should make a GET call to the specific Group url', async () => {
            const groupToGetId = 'Group-to-be-fetched';
            await group.get(groupToGetId);
            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(`${Group.baseUrl}/${groupToGetId}`);
        });
    });

    describe('update', () => {
        it('should make a PUT call to the specific Group url', async () => {
            const groupModel: GroupModel = {
                id: 'group-to-update-id',
                displayName: 'Group to be updated',
            };

            await group.update(groupModel);
            expect(api.put).toHaveBeenCalledTimes(1);
            expect(api.put).toHaveBeenCalledWith(`${Group.baseUrl}/${groupModel.id}`, groupModel);
        });
    });

    describe('listExclusivePrivileges', () => {
        it('should make a GET call to the /groups/{groupId}/privileges/exclusive/me', async () => {
            await group.listExclusivePrivileges('💎');

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/groups/💎/privileges/exclusive/me',
            );
        });
    });

    it('should register the realm resource', () => {
        expect(group.realm).toBeDefined();
        expect(group.realm).toBeInstanceOf(GroupRealm);
    });

    it('should register the member resource', () => {
        expect(group.member).toBeDefined();
        expect(group.member).toBeInstanceOf(GroupMember);
    });

    it('should register the invite resource', () => {
        expect(group.invite).toBeDefined();
        expect(group.invite).toBeInstanceOf(GroupInvite);
    });
});
