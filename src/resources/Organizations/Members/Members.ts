import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {OrganizationMemberModel} from './MembersInterface.js';

export default class Members extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/members`;

    getAll() {
        return this.api.get<OrganizationMemberModel[]>(Members.baseUrl);
    }

    delete(username: string) {
        return this.api.delete<void>(`${Members.baseUrl}/${username}`);
    }

    get(username: string) {
        return this.api.get<OrganizationMemberModel>(`${Members.baseUrl}/${username}`);
    }
}
