import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {DefaultGroupModel} from '../GroupsInterfaces.js';

export default class BuiltInGroups extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/defaultgroups`;

    list(): Promise<DefaultGroupModel[]> {
        return this.api.get<DefaultGroupModel[]>(BuiltInGroups.baseUrl);
    }
}
