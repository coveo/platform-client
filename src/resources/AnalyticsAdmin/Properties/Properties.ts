import Resource from '../../Resource.js';
import API from '../../../APICore.js';
import {PageModel, Paginated} from '../../BaseInterfaces.js';
import {PropertiesResponseMessage, PropertyModel} from './PropertiesInterfaces.js';

export default class Properties extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/analyticsadmin/v1`;
    /**
     * Build the request path, handling the optional `org` query parameter.
     *
     * @param route The path part of the request.
     * @param queryParams Optional query parameters object.
     * If this object contains an `org` property, it will override the value from the configuration.
     * @returns The request path including formatted query parameters.
     */
    protected buildPathWithOrg(route: string, queryParams?: any): string {
        return super.buildPath(route, {org: this.api.organizationId, ...queryParams});
    }

    /**
     * List all properties
     *
     * @returns Promise<PageModel<PropertyModel>>
     */
    listProperties(pagination?: Paginated): Promise<PageModel<PropertyModel>> {
        return this.api.get<PageModel<PropertyModel>>(
            this.buildPathWithOrg(`${Properties.baseUrl}/properties/list`, pagination),
        );
    }

    /**
     * Get a property
     *
     * @returns Promise<PropertyModel>
     */
    getProperty(trackingId: string): Promise<PropertyModel> {
        return this.api.get<PropertyModel>(this.buildPathWithOrg(`${Properties.baseUrl}/properties/${trackingId}`));
    }

    /**
     * Create a property
     *
     * @returns Promise<PropertiesResponseMessage>
     */
    createProperty(trackingId: string, displayName: string): Promise<PropertiesResponseMessage> {
        return this.api.post<PropertiesResponseMessage>(
            this.buildPathWithOrg(`${Properties.baseUrl}/properties/${trackingId}`, {displayName}),
        );
    }

    /**
     * Edit a property
     *
     * @returns Promise<PropertiesResponseMessage>
     */
    updateProperty(trackingId: string, displayName: string): Promise<PropertiesResponseMessage> {
        return this.api.put<PropertiesResponseMessage>(
            this.buildPathWithOrg(`${Properties.baseUrl}/properties/${trackingId}`, {displayName}),
        );
    }

    /**
     * Delete a property
     *
     * @returns Promise<PropertiesResponseMessage>
     */
    deleteProperty(trackingId: string): Promise<PropertiesResponseMessage> {
        return this.api.delete<PropertiesResponseMessage>(
            this.buildPathWithOrg(`${Properties.baseUrl}/properties/${trackingId}`),
        );
    }
}
