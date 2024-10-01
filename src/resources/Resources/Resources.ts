import API from '../../APICore.js';
import {PageModel} from '../BaseInterfaces.js';
import {ProjectResourceType} from '../Projects/ProjectInterfaces.js';
import Resource from '../Resource.js';
import {ResourceParams, ResourceModel} from './ResourcesInterfaces.js';

export default class Resources extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/resources`;

    /**
     * Returns a paginated list of resources.
     * @param resourceType
     * @param params
     * @returns A paginated list of resources.
     */
    list(resourceType: ProjectResourceType, params?: ResourceParams): Promise<PageModel<ResourceModel>> {
        return this.api.get<PageModel<ResourceModel>>(this.buildPath(`${Resources.baseUrl}/${resourceType}`, params));
    }
}
