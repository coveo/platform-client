import Resource from '../../Resource.js';

export type ObjectType = {
    objectType: string;
};

export default class CatalogContent extends Resource {
    getObjectTypes(sourceId: string, organizationId: string) {
        return this.api.get(`/rest/organizations/${organizationId}/catalogcontent/source/${sourceId}/objecttypes`);
    }

    getMetadataValues(sourceId: string, organizationId: string, objectType: ObjectType) {
        return this.api.get(
            this.buildPath(
                `/rest/organizations/${organizationId}/catalogcontent/source/${sourceId}/metadatavalues`,
                objectType,
            ),
        );
    }

    getMetadata(sourceId: string, organizationId: string, objectType: ObjectType) {
        return this.api.get(
            this.buildPath(
                `/rest/organizations/${organizationId}/catalogcontent/source/${sourceId}/metadata`,
                objectType,
            ),
        );
    }
}
