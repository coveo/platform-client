import API from '../../APICore';
import Resource from '../Resource';

export default class Sources extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/sources`;

    listSourceItemTypes(sourceId: string) {
        return this.api.get<string[]>(`${Sources.baseUrl}/${sourceId}/itemTypes`);
    }
}
