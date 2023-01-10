import API from '../../APICore.js';
import {PageModel} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {
    CreateCoveoIndexModel,
    IndexAttributes,
    IndexBackupsItems,
    IndexBackupsOptions,
    IndexStatisticsModel,
    RawIndexConfig,
} from './IndexesInterface.js';

export default class Indexes extends Resource {
    static baseUrl = `/rest/organizations/${API.orgPlaceholder}/indexes`;
    static indexBackupUrl = `/rest/organizations/${API.orgPlaceholder}/indexbackups/page`;

    list() {
        return this.api.get<IndexAttributes[]>(Indexes.baseUrl);
    }

    // Same for Copy Index but making sure to pass copyFromId and machineSpec
    create(indexModal?: CreateCoveoIndexModel) {
        return this.api.post<{id: string}>(Indexes.baseUrl, indexModal);
    }

    delete(indexId: string) {
        return this.api.delete(`${Indexes.baseUrl}/${indexId}`);
    }

    get(indexId: string) {
        return this.api.get<IndexAttributes>(`${Indexes.baseUrl}/${indexId}`);
    }

    backup(indexId: string) {
        return this.api.post<{id: string}>(`${Indexes.baseUrl}/${indexId}/backup`, {});
    }

    getBackups(options?: IndexBackupsOptions) {
        return this.api.get<PageModel<IndexBackupsItems>>(this.buildPath(`${Indexes.indexBackupUrl}`, options));
    }

    forceCommit(indexId: string) {
        return this.api.post(`${Indexes.baseUrl}/${indexId}/commit`, {});
    }

    readOnly(indexId: string, isReadOnly: boolean) {
        return this.api.put(this.buildPath(`${Indexes.baseUrl}/${indexId}/readonly`, {isReadOnly}), {});
    }

    resize(indexId: string, sizeInGibibytes: number) {
        return this.api.post(`${Indexes.baseUrl}/${indexId}/resize`, {sizeInGibibytes});
    }

    stats(indexId: string) {
        return this.api.get<IndexStatisticsModel>(`${Indexes.baseUrl}/${indexId}/stats`);
    }

    isOnline(indexId: string, isOnline: boolean) {
        return this.api.put(this.buildPath(`${Indexes.baseUrl}/${indexId}/online`, {isOnline}), {});
    }

    restore(indexId: string, backupId: string) {
        return this.api.post(this.buildPath(`${Indexes.baseUrl}/${indexId}/restore`, {backupId}), {});
    }

    getJson(indexId: string) {
        return this.api.get<RawIndexConfig>(`${Indexes.baseUrl}/${indexId}/configuration`);
    }

    editJson(indexId: string, indexConfig: RawIndexConfig) {
        return this.api.put(`${Indexes.baseUrl}/${indexId}/configuration`, indexConfig);
    }

    editJsonAll(indexConfig: RawIndexConfig) {
        return this.api.put(`${Indexes.baseUrl}/raw`, indexConfig);
    }
}
