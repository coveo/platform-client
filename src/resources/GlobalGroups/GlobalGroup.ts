import {New} from '../BaseInterfaces.js';
import Resource from '../Resource.js';
import {GlobalGroupModel} from './GlobalGroupInterfaces.js';

export default class GlobalGroup extends Resource {
    static baseUrl = '/rest/globalgroups';

    list() {
        return this.api.get<GlobalGroupModel[]>(GlobalGroup.baseUrl);
    }

    create(globalGroup: New<GlobalGroupModel>) {
        return this.api.post<{id: string}>(GlobalGroup.baseUrl, globalGroup);
    }

    delete(globalGroupId: string) {
        return this.api.delete(`${GlobalGroup.baseUrl}/${globalGroupId}`);
    }

    get(globalGroupId: string) {
        return this.api.get<GlobalGroupModel>(`${GlobalGroup.baseUrl}/${globalGroupId}`);
    }

    update(globalGroup: GlobalGroupModel) {
        return this.api.put(`${GlobalGroup.baseUrl}/${globalGroup.id}`, globalGroup);
    }
}
