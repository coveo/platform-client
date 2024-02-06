import Resource from '../Resource.js';
import {AuthInviteModel} from './Invites.model.js';

export default class Invites extends Resource {
    static baseUrl = '/rest/invites';
    /**
     * Lists groups current user is invited too.
     */
    list() {
        return this.api.get<AuthInviteModel[]>(Invites.baseUrl);
    }
}
