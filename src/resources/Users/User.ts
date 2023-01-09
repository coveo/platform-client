import {RealmModel} from '../Groups/index.js';
import Resource from '../Resource.js';
import {UserModel} from './UserInterfaces.js';

export default class User extends Resource {
    static baseUrl = '/rest/users';

    get(username: string = this.api.currentUser?.username) {
        return this.api.get<UserModel>(`${User.baseUrl}/${username}`);
    }

    update(user: Partial<UserModel>) {
        return this.api.put(`${User.baseUrl}/${this.api.currentUser?.username}`, {...this.api.currentUser, ...user});
    }

    listRealms(username: string) {
        return this.api.get<RealmModel[]>(`${User.baseUrl}/${username}/realms`);
    }
}
