import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import {RealmModel} from './GroupRealmInterfaces.js';

export default class GroupRealm extends Resource {
    static getBaseUrl = (id: string) => `/rest/organizations/${API.orgPlaceholder}/groups/${id}/realms`;

    list(groupId: string) {
        return this.api.get<RealmModel[]>(GroupRealm.getBaseUrl(groupId));
    }

    add(groupId: string, realm: RealmModel) {
        return this.api.post(GroupRealm.getBaseUrl(groupId), realm);
    }

    delete(groupId: string, realmId: string) {
        return this.api.delete(`${GroupRealm.getBaseUrl(groupId)}/${realmId}`);
    }

    get(groupId: string, realmId: string) {
        return this.api.get<RealmModel>(`${GroupRealm.getBaseUrl(groupId)}/${realmId}`);
    }
}
