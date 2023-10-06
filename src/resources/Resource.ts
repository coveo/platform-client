import API from '../APICore.js';
import queryString from '#query-string';

const defaultOptions: queryString.StringifyOptions = {skipEmptyString: true, skipNull: true, sort: false};

class Resource {
    static baseUrl: string;

    constructor(
        protected api: API,
        protected serverlessApi: API,
    ) {}

    protected buildPath(route: string, parameters?: any, options?: queryString.StringifyOptions): string {
        return route + this.convertObjectToQueryString(parameters, options);
    }

    private convertObjectToQueryString(parameters: any, userOptions?: queryString.StringifyOptions): string {
        if (!parameters) {
            return '';
        } else {
            const requestURL = queryString.stringify(parameters, {...defaultOptions, ...userOptions});
            return requestURL.length ? `?${requestURL}` : '';
        }
    }
}

export default Resource;
