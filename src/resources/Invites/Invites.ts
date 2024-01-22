import Resource from '../Resource.js';
import {AuthInviteModel} from './Invites.model.js';

export default class Invites extends Resource {
    static baseUrl = '/rest/invites';

    list() {
        return this.api.get<AuthInviteModel[]>(Invites.baseUrl);
    }
}
