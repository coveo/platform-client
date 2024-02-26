import Resource from '../../Resource.js';
import API from '../../../APICore.js';

export default class TailgateCatalogContent extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/catalogcontent/source/`;

    getObjectTypes(sourceId: string) {
        return this.api.get(`${TailgateCatalogContent.baseUrl}/${sourceId}/objecttypes`);
    }

    getMetadata(sourceId: string, objectType: string) {
        return this.api.get(this.buildPath(`${TailgateCatalogContent.baseUrl}/${sourceId}/metadata`, objectType));
    }
}
