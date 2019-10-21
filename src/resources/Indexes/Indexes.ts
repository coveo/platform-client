import API from '../../APICore';
import Resource from '../Resource';
import {CreateCoveoIndexModel, IndexAttributes} from './IndexesInterface';

export default class Indexes extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/indexes`;

    list() {
        return this.api.get<IndexAttributes[]>(Indexes.baseUrl);
    }

    create(indexModal: CreateCoveoIndexModel) {
        return this.api.post<IndexAttributes>(Indexes.baseUrl, indexModal);
    }

    delete(indexId: string) {
        return this.api.delete(`${Indexes.baseUrl}/${indexId}`);
    }

    get(indexId: string) {
        return this.api.get<IndexAttributes[]>(`${Indexes.baseUrl}/${indexId}`);
    }

    restore(backupId: string) {
        return this.api.post<IndexAttributes>(Indexes.baseUrl, {id: backupId});
    }
}
