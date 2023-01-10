import API from '../../../APICore.js';
import {New} from '../../BaseInterfaces.js';
import Resource from '../../Resource.js';
import {AddInviteOptions, InviteModel} from './GroupInviteInterfaces.js';

export default class GroupInvite extends Resource {
    static getBaseUrl = (id: string) => `/rest/organizations/${API.orgPlaceholder}/groups/${id}/invites`;

    list(groupId: string) {
        return this.api.get<InviteModel[]>(GroupInvite.getBaseUrl(groupId));
    }

    add(groupId: string, invite: New<InviteModel>, options: AddInviteOptions = {sendEmail: true}) {
        return this.api.post<InviteModel>(this.buildPath(GroupInvite.getBaseUrl(groupId), options), invite);
    }

    delete(groupId: string, usernameOrEmail: string) {
        return this.api.delete(`${GroupInvite.getBaseUrl(groupId)}/${usernameOrEmail}`);
    }

    accept(groupId: string) {
        return this.api.post(`${GroupInvite.getBaseUrl(groupId)}/accept`);
    }

    decline(groupId: string) {
        return this.api.post(`${GroupInvite.getBaseUrl(groupId)}/decline`);
    }
}
