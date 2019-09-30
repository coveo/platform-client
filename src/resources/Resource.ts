import API from '../APICore';

class Resource {
    static baseUrl: string;

    constructor(protected api: API) {}

    protected buildPath(route: string, parameters: object): string {
        return route + this.convertObjectToQueryString(parameters);
    }

    private removeEmptyEntriesFromObject(obj) {
        return Object.entries(obj)
            .filter(([, value]) => value != null && value !== '')
            .reduce(
                (newObj, [key, value]) =>
                    typeof value === 'object'
                        ? {...newObj, [key]: this.removeEmptyEntriesFromObject(value)}
                        : {...newObj, [key]: value},
                {}
            );
    }

    private convertObjectToQueryString(parameters: object): string {
        if (!parameters) {
            return '';
        } else {
            const cleanedParameters = this.removeEmptyEntriesFromObject(parameters);
            return Object.keys(cleanedParameters).length
                ? `?${new URLSearchParams(Object.entries(cleanedParameters)).toString()}`
                : '';
        }
    }
}

export default Resource;
