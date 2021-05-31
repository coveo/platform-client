import API from '../../../APICore';
import Resource from '../../Resource';
import {OrganizationMemberModel} from './MembersInterface';

export default class Members extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/members`;

    getAll() {
        return this.api.get<OrganizationMemberModel[]>(Members.baseUrl);
    }

    delete(username: string) {
        return this.api.delete<void>(`${Members.baseUrl}/${username}`);
    }
}
