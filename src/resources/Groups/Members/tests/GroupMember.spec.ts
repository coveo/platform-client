import API from '../../../../APICore';
import GroupMember from '../GroupMember';
import {MemberModel} from '../GroupMemberInterfaces';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('groupmember', () => {
    let groupMember: GroupMember;
    const api = new APIMock() as jest.Mocked<API>;
    const groupId = '💎';

    beforeEach(() => {
        jest.clearAllMocks();
        groupMember = new GroupMember(api);
    });

    describe('list', () => {
        it('should make a GET call to the GroupMember base url', () => {
            groupMember.list(groupId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/groups/💎/members');
        });
    });

    describe('add', () => {
        const member: MemberModel = {
            id: '🐙@coveo.com-google',
            username: '🐙@coveo.com-google',
        };

        it('should make a POST call to the GroupMember base url and set the send email param to true by default', () => {
            groupMember.add(groupId, member);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/groups/💎/members?sendEmailOnInvite=true',
                member
            );
        });

        it('should set the send email param to false if specified to false', () => {
            groupMember.add(groupId, member, {sendEmailOnInvite: false});

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/groups/💎/members?sendEmailOnInvite=false',
                member
            );
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to /members/:username', () => {
            groupMember.delete(groupId, '🐢');

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith('/rest/organizations/{organizationName}/groups/💎/members/🐢');
        });
    });

    describe('get', () => {
        it('should make a GET call to /members/:username', () => {
            groupMember.get(groupId, '🐟');

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/groups/💎/members/🐟');
        });
    });
});
