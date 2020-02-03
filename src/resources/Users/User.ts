import {RealmModel} from '../Groups';
import Resource from '../Resource';
import {UserModel} from './UserInterfaces';

export default class User extends Resource {
    static baseUrl = '/rest/users';

    get(username: string) {
        return this.api.get<UserModel>(`${User.baseUrl}/${username}`);
    }

    update(username: string, user: UserModel) {
        return this.api.put(`${User.baseUrl}/${username}`, user);
    }

    listRealms(username: string) {
        return this.api.get<RealmModel[]>(`${User.baseUrl}/${username}/realms`);
    }
}
