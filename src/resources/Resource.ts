import API from '../APICore.js';
import {stringifyNestedObjects} from '../utils/stringifyNestedObjects.js';
import {stringifyQuery, StringifyQueryOptions} from '../utils/stringifyQuery.js';

class Resource {
    static baseUrl: string;

    constructor(
        protected api: API,
        protected serverlessApi: API,
    ) {}

    protected buildPath(route: string, parameters?: object, options?: StringifyQueryOptions): string {
        return parameters ? route + this.convertObjectToQueryString(parameters, options) : route;
    }

    private convertObjectToQueryString(parameters: object, options?: StringifyQueryOptions): string {
        if (!parameters) {
            return '';
        } else {
            if (typeof parameters === 'object' && !Array.isArray(parameters)) {
                parameters = stringifyNestedObjects(parameters);
            }
            const requestURL = stringifyQuery(parameters, options);
            return requestURL.length ? `?${requestURL}` : '';
        }
    }
}

export default Resource;
