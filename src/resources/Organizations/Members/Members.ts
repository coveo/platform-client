import API from '../../../APICore.js';
import {GlobalPrivilegeModel} from '../../GlobalGroups/GlobalGroupInterfaces.js';
import {GroupModel, UpdateGroupOptions} from '../../Groups/GroupsInterfaces.js';
import Resource from '../../Resource.js';
import {OrganizationMemberModel} from './MembersInterface.js';

export default class Members extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/members`;

    /**
     * Lists the members of an organization.
     */
    getAll() {
        return this.api.get<OrganizationMemberModel[]>(Members.baseUrl);
    }
    /**
     * deletes the member from all groups of an organization.
     * Note: Deleted users can still be included by domain.
     * @param username The username of the member to delete.
     */
    delete(username: string) {
        return this.api.delete<void>(`${Members.baseUrl}/${username}`);
    }
    /**
     * Shows a member of an organization.
     * @param username  The username of the member to show.
     */
    get(username: string) {
        return this.api.get<OrganizationMemberModel>(`${Members.baseUrl}/${username}`);
    }
    /**
     * Lists the privileges for the current user on an organization.
     */
    getPrivileges() {
        return this.api.get<GlobalPrivilegeModel[]>(`${Members.baseUrl}/privileges`);
    }
    /**
     * Updates the members of an organization.
     * @param sendEmailToInvitedUsers Whether to send an invitation email alongside the invite(s). Default to true.
     * @param model
     * @param options
     */
    updateOrganizationMembers(model: OrganizationMemberModel[], options?: UpdateGroupOptions) {
        return this.api.put<OrganizationMemberModel[]>(this.buildPath(Members.baseUrl, options), model);
    }
    /**
     * Updates a member of an organization.
     * @param username The username of the member to update.
     * @param model
     */
    updateMember(username: string, model: OrganizationMemberModel) {
        return this.api.put<OrganizationMemberModel>(`${Members.baseUrl}/${username}`, model);
    }
    /**
     * Lists the groups to which an organization member belongs.
     * @param username The username of the user for which to list groups.
     */
    getGroups(username: string) {
        return this.api.get<GroupModel[]>(`${Members.baseUrl}/${username}/groups`);
    }
}
