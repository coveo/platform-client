import {IAPI} from '../APICore';
import {IAPIFeature} from '../features/APIFeature';

class Resource {
    static baseUrl: string;

    constructor(protected api: IAPI) {}

    withFeatures(...features: IAPIFeature[]): this {
        const apiWithAllFeatures = features.reduce((acc, current) => current(acc), this.api);
        const newInstance = Object.create(this) as this;
        return newInstance.constructor(apiWithAllFeatures);
    }

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
