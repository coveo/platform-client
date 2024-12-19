import API from '../../../APICore.js';
import Resource from '../../Resource.js';

/**
 * @deprecated Will be removed from the API in January 2025
 */
export default class UserActionHistoryConfiguration extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/machinelearning/configuration/useractionhistory`;

    /**
     * @deprecated
     */
    create() {
        return this.api.post<void>(UserActionHistoryConfiguration.baseUrl);
    }

    /**
     * @deprecated
     */
    delete() {
        return this.api.delete<void>(UserActionHistoryConfiguration.baseUrl);
    }

    /**
     * @deprecated
     */
    get() {
        return this.api.get<boolean>(UserActionHistoryConfiguration.baseUrl);
    }
}
