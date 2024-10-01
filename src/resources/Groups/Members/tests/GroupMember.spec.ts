import API from '../../../../APICore.js';
import GroupMember from '../GroupMember.js';
import {MemberModel} from '../GroupMemberInterfaces.js';

jest.mock('../../../../APICore.js');

describe('groupmember', () => {
    let groupMember: GroupMember;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});
    const groupId = '💎';

    beforeEach(() => {
        jest.clearAllMocks();
        groupMember = new GroupMember(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the GroupMember base url', async () => {
            await groupMember.list(groupId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/groups/💎/members');
        });
    });

    describe('add', () => {
        const member: MemberModel = {
            id: '🐙@coveo.com-google',
            username: '🐙@coveo.com-google',
        };

        it('should make a POST call to the GroupMember base url and set the send email param to true by default', async () => {
            await groupMember.add(groupId, member);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/groups/💎/members?sendEmailOnInvite=true',
                member,
            );
        });

        it('should set the send email param to false if specified to false', async () => {
            await groupMember.add(groupId, member, {sendEmailOnInvite: false});

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/groups/💎/members?sendEmailOnInvite=false',
                member,
            );
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to /members/:username', async () => {
            await groupMember.delete(groupId, '🐢');

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith('/rest/organizations/{organizationName}/groups/💎/members/🐢');
        });
    });

    describe('get', () => {
        it('should make a GET call to /members/:username', async () => {
            await groupMember.get(groupId, '🐟');

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/groups/💎/members/🐟');
        });
    });
});
