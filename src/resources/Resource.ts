import API from '../APICore.js';
import queryString from '#query-string';

class Resource {
    static baseUrl: string;

    constructor(
        protected api: API,
        protected serverlessApi: API,
    ) {}

    protected buildPath(route: string, parameters?: any): string {
        return route + this.convertObjectToQueryString(parameters);
    }

    private convertObjectToQueryString(parameters: any): string {
        if (!parameters) {
            return '';
        } else {
            const requestURL = queryString.stringify(parameters, {skipEmptyString: true, skipNull: true, sort: false});
            return requestURL.length ? `?${requestURL}` : '';
        }
    }
}

export default Resource;
