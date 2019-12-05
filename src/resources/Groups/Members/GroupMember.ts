import API from '../../../APICore';
import Resource from '../../Resource';
import {AddGroupMemberOptions, MemberModel} from './GroupMemberInterfaces';

export default class GroupMember extends Resource {
    static getBaseUrl = (id: string) => `/rest/organizations/${API.orgPlaceholder}/groups/${id}/members`;

    list(groupId: string) {
        return this.api.get<MemberModel[]>(GroupMember.getBaseUrl(groupId));
    }

    add(groupId: string, member: MemberModel, options: AddGroupMemberOptions = {sendEmailOnInvite: true}) {
        return this.api.post(this.buildPath(GroupMember.getBaseUrl(groupId), options), member);
    }

    delete(groupId: string, username: string) {
        return this.api.delete(`${GroupMember.getBaseUrl(groupId)}/${username}`);
    }

    get(groupId: string, username: string) {
        return this.api.get<MemberModel>(`${GroupMember.getBaseUrl(groupId)}/${username}`);
    }
}
