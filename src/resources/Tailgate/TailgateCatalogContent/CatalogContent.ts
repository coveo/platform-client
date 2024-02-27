import Resource from '../../Resource.js';
import API from '../../../APICore.js';

export default class CatalogContent extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogcontent/source/`;

    getObjectTypes(sourceId: string) {
        return this.api.get(`${CatalogContent.baseUrl}/${sourceId}/objecttypes`);
    }

    getMetadata(sourceId: string, objectType: string) {
        return this.api.get(this.buildPath(`${CatalogContent.baseUrl}/${sourceId}/metadata`, objectType));
    }
}
