import Resource from '../../Resource.js';

/**
 * Extends Resource with a `buildPathWithOrg` method, that will fill in the optional `org` query parameter by default.
 * It still allows "overriding" the org by specifying it explicitly in the parameters.
 */
export default class ReadServiceResource extends Resource {
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
}
