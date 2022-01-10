import API from '../../../APICore';
import Resource from '../../Resource';

export default class UserActionHistoryConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/useractionhistory`;

    create() {
        return this.api.post<void>(UserActionHistoryConfiguration.baseUrl);
    }

    delete() {
        return this.api.delete<void>(UserActionHistoryConfiguration.baseUrl);
    }

    get() {
        return this.api.get<boolean>(UserActionHistoryConfiguration.baseUrl);
    }
}
