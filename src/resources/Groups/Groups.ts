import API from '../../APICore';
import {New} from '../BaseInterfaces';
import Resource from '../Resource';
import {CreateGroupOptions, GroupModel, UpdateGroupOptions} from './GroupsInterfaces';

export default class Group extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/groups`;

    list() {
        return this.api.get<GroupModel[]>(Group.baseUrl);
    }

    create(group: New<GroupModel, 'resourceId'>, options?: CreateGroupOptions) {
        return this.api.post<GroupModel>(this.buildPath(Group.baseUrl, options), group);
    }

    delete(groupId: string) {
        return this.api.delete(`${Group.baseUrl}/${groupId}`);
    }

    get(groupId: string) {
        return this.api.get<GroupModel>(`${Group.baseUrl}/${groupId}`);
    }

    update(group: GroupModel, options?: UpdateGroupOptions) {
        return this.api.put<GroupModel>(this.buildPath(`${Group.baseUrl}/${group.id}`, options), group);
    }
}
