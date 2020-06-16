import * as queryString from 'query-string';

import API from '../APICore';

class Resource {
    static baseUrl: string;

    constructor(protected api: API) {}

    protected buildPath(route: string, parameters: object): string {
        return route + this.convertObjectToQueryString(parameters);
    }

    private convertObjectToQueryString(parameters: object): string {
        if (!parameters) {
            return '';
        } else {
            const requestURL = queryString.stringify(parameters, {skipEmptyString: true, skipNull: true, sort: false});
            return requestURL.length ? `?${requestURL}` : '';
        }
    }
}

export default Resource;
