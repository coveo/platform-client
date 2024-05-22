import API from '../../APICore.js';
import Resource from '../Resource.js';
import {CatalogMetadata, CatalogMetadataName, CatalogObjectType} from './CatalogInterfaces.js';

export type ObjectType = {
    objectType: string;
};

export default class CatalogContent extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogcontent/source`;

    getObjectTypeV2(sourceId: string) {
        return this.api.get<CatalogObjectType>(this.buildPath(`${CatalogContent.baseUrl}/${sourceId}/objecttypes`));
    }

    getMetadataValues(sourceId: string, objectType: ObjectType) {
        return this.api.get<CatalogMetadata>(
            this.buildPath(`${CatalogContent.baseUrl}/${sourceId}/metadatavalues`, objectType),
        );
    }

    getMetadata(sourceId: string, objectType: ObjectType) {
        return this.api.get<CatalogMetadataName>(
            this.buildPath(`${CatalogContent.baseUrl}/${sourceId}/metadata`, objectType),
        );
    }
}
