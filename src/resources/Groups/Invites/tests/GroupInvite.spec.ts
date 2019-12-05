import API from '../../../../APICore';
import {New} from '../../../BaseInterfaces';
import GroupInvite from '../GroupInvite';
import {InviteModel} from '../GroupInviteInterfaces';

jest.mock('../../../../APICore');

const APIMock: jest.Mock<API> = API as any;

describe('groupInvite', () => {
    let invite: GroupInvite;
    const api = new APIMock() as jest.Mocked<API>;
    const groupId = '💎';

    beforeEach(() => {
        jest.clearAllMocks();
        invite = new GroupInvite(api);
    });

    describe('list', () => {
        it('should make a GET call to the group invites url', () => {
            invite.list(groupId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/groups/💎/invites');
        });
    });

    describe('add', () => {
        it('should make a POST call to the groups invites url and set the "sendEmail" parameter to true by default', () => {
            const inviteModel: New<InviteModel> = {
                username: '🐠@coveo.com-google',
            };
            invite.add(groupId, inviteModel);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/groups/💎/invites?sendEmail=true',
                inviteModel
            );
        });

        it('should make a POST call to the groups invites url and set the "sendEmail" parameter to false if specified', () => {
            const inviteModel: New<InviteModel> = {
                username: '🐠@coveo.com-google',
            };
            invite.add(groupId, inviteModel, {sendEmail: false});

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/groups/💎/invites?sendEmail=false',
                inviteModel
            );
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to /invites/:usernameOrEmail', () => {
            invite.delete(groupId, '🐢');

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith('/rest/organizations/{organizationName}/groups/💎/invites/🐢');
        });
    });

    describe('accept', () => {
        it('should make a POST call to /invites/accept', () => {
            invite.accept(groupId);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/organizations/{organizationName}/groups/💎/invites/accept');
        });
    });

    describe('decline', () => {
        it('should make a POST call to /invites/decline', () => {
            invite.decline(groupId);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/organizations/{organizationName}/groups/💎/invites/decline');
        });
    });
});
