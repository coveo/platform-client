import API from '../../../../APICore.js';
import {New} from '../../../BaseInterfaces.js';
import GroupInvite from '../GroupInvite.js';
import {InviteModel} from '../GroupInviteInterfaces.js';

jest.mock('../../../../APICore.js');

describe('groupInvite', () => {
    let invite: GroupInvite;
    const api = new API({accessToken: 'some-token'});
    const serverlessApi = new API({accessToken: 'some-token'});
    const groupId = '💎';

    beforeEach(() => {
        jest.clearAllMocks();
        invite = new GroupInvite(api, serverlessApi);
    });

    describe('list', () => {
        it('should make a GET call to the group invites url', async () => {
            await invite.list(groupId);

            expect(api.get).toHaveBeenCalledTimes(1);
            expect(api.get).toHaveBeenCalledWith('/rest/organizations/{organizationName}/groups/💎/invites');
        });
    });

    describe('add', () => {
        it('should make a POST call to the groups invites url and set the "sendEmail" parameter to true by default', async () => {
            const inviteModel: New<InviteModel> = {
                username: '🐠@coveo.com-google',
            };
            await invite.add(groupId, inviteModel);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/groups/💎/invites?sendEmail=true',
                inviteModel,
            );
        });

        it('should make a POST call to the groups invites url and set the "sendEmail" parameter to false if specified', async () => {
            const inviteModel: New<InviteModel> = {
                username: '🐠@coveo.com-google',
            };
            await invite.add(groupId, inviteModel, {sendEmail: false});

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith(
                '/rest/organizations/{organizationName}/groups/💎/invites?sendEmail=false',
                inviteModel,
            );
        });
    });

    describe('delete', () => {
        it('should make a DELETE call to /invites/:usernameOrEmail', async () => {
            await invite.delete(groupId, '🐢');

            expect(api.delete).toHaveBeenCalledTimes(1);
            expect(api.delete).toHaveBeenCalledWith('/rest/organizations/{organizationName}/groups/💎/invites/🐢');
        });
    });

    describe('accept', () => {
        it('should make a POST call to /invites/accept', async () => {
            await invite.accept(groupId);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/organizations/{organizationName}/groups/💎/invites/accept');
        });
    });

    describe('decline', () => {
        it('should make a POST call to /invites/decline', async () => {
            await invite.decline(groupId);

            expect(api.post).toHaveBeenCalledTimes(1);
            expect(api.post).toHaveBeenCalledWith('/rest/organizations/{organizationName}/groups/💎/invites/decline');
        });
    });
});
