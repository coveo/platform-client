import API from '../../APICore.js';
import Resource from '../Resource.js';
import {MetadataPageModel} from '../Sources/index.js';
import {
    CatalogMetadata,
    CatalogMetadataName,
    CatalogMetadataNameParams,
    CatalogObjectType,
} from './CatalogInterfaces.js';

export type ObjectType = {
    objectType: string;
};

export default class CatalogContent extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogcontent/source`;

    getObjectTypes(sourceId: string) {
        return this.api.get<CatalogObjectType>(`${CatalogContent.baseUrl}/${sourceId}/objecttypes`);
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

    getMetadataV2(sourceId: string, params?: CatalogMetadataNameParams) {
        return this.api.get<MetadataPageModel>(
            this.buildPath(`${CatalogContent.baseUrl}/${sourceId}/metadata`, params),
        );
    }
}
