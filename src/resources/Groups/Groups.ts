import API from '../../APICore.js';
import {New, PrivilegeModel} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {CreateGroupOptions, GroupModel, UpdateGroupOptions} from './GroupsInterfaces.js';
import GroupInvite from './Invites/GroupInvite.js';
import GroupMember from './Members/GroupMember.js';
import GroupRealm from './Realms/GroupRealm.js';

export default class Group extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/groups`;

    realm: GroupRealm;
    member: GroupMember;
    invite: GroupInvite;

    constructor(
        protected api: API,
        protected serverlessApi: API,
    ) {
        super(api, serverlessApi);

        this.realm = new GroupRealm(api, serverlessApi);
        this.member = new GroupMember(api, serverlessApi);
        this.invite = new GroupInvite(api, serverlessApi);
    }

    list() {
        return this.api.get<GroupModel[]>(Group.baseUrl);
    }

    create(group: New<GroupModel, 'resourceId'>, options?: CreateGroupOptions) {
        return this.api.post<{id: string}>(this.buildPath(Group.baseUrl, options), group);
    }

    delete(groupId: string) {
        return this.api.delete(`${Group.baseUrl}/${groupId}`);
    }

    get(groupId: string) {
        return this.api.get<GroupModel>(`${Group.baseUrl}/${groupId}`);
    }

    update(group: GroupModel, options?: UpdateGroupOptions) {
        return this.api.put(this.buildPath(`${Group.baseUrl}/${group.id}`, options), group);
    }

    listExclusivePrivileges(groupId: string) {
        return this.api.get<PrivilegeModel[]>(`${Group.baseUrl}/${groupId}/privileges/exclusive/me`);
    }
}
