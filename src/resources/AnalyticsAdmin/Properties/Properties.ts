import Resource from '../../Resource.js';
import API from '../../../APICore.js';
import {PageModel} from '../../BaseInterfaces.js';
import {ListPropertiesRequest, PropertyActionResponse, PropertyModel} from './PropertiesInterfaces.js';

export default class Properties extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/analyticsadmin/v1`;
    /**
     * Build the request path, handling the optional `org` query parameter.
     * @param route The path part of the request.
     * @param queryParams Optional query parameters object.
     * If this object contains an `org` property, it will override the value from the configuration.
     * @returns The request path including formatted query parameters.
     */
    protected buildPathWithOrg(route: string, queryParams?: object): string {
        return super.buildPath(route, {org: this.api.organizationId, ...queryParams});
    }

    /**
     * List all properties, optionally using filters.
     * Note that `list` and `query` are equivalent, with the only difference being that `list` uses GET and `query` uses POST.
     *
     * @param params Optional parameters to filter the listing by.
     * @returns Promise<PageModel<PropertyModel>>
     */
    list(params?: ListPropertiesRequest): Promise<PageModel<PropertyModel>> {
        return this.api.get<PageModel<PropertyModel>>(
            this.buildPathWithOrg(`${Properties.baseUrl}/properties`, params),
        );
    }

    /**
     * Query all properties, optionally using filters.
     * Note that `list` and `query` are equivalent, with the only difference being that `list` uses GET and `query` uses POST.
     *
     * @param params Optional parameters to filter the listing by.
     * @returns Promise<PageModel<PropertyModel>>
     */
    query(params?: ListPropertiesRequest): Promise<PageModel<PropertyModel>> {
        return this.api.post<PageModel<PropertyModel>>(
            this.buildPathWithOrg(`${Properties.baseUrl}/properties`),
            params,
        );
    }

    /**
     * Get a property.
     *
     * @param trackingId
     * @returns Promise<PropertyModel>
     */
    get(trackingId: string): Promise<PropertyModel> {
        return this.api.get<PropertyModel>(this.buildPathWithOrg(`${Properties.baseUrl}/properties/${trackingId}`));
    }

    /**
     * Create a property.
     *
     * @param trackingId
     * @param displayName
     * @returns Promise<PropertyActionResponse>
     */
    create(trackingId: string, displayName: string): Promise<PropertyActionResponse> {
        return this.api.post<PropertyActionResponse>(
            this.buildPathWithOrg(`${Properties.baseUrl}/properties/${trackingId}`, {displayName}),
        );
    }

    /**
     * Edit a property.
     *
     * @param trackingId
     * @param displayName
     * @returns Promise<PropertyActionResponse>
     */
    update(trackingId: string, displayName: string): Promise<PropertyActionResponse> {
        return this.api.put<PropertyActionResponse>(
            this.buildPathWithOrg(`${Properties.baseUrl}/properties/${trackingId}`, {displayName}),
        );
    }

    /**
     * Delete a property.
     * @param trackingId
     * @returns Promise<PropertyActionResponse>
     */
    delete(trackingId: string): Promise<PropertyActionResponse> {
        return this.api.delete<PropertyActionResponse>(
            this.buildPathWithOrg(`${Properties.baseUrl}/properties/${trackingId}`),
        );
    }
}
