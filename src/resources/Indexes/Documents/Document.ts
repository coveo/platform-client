import API from '../../../APICore.js';
import Resource from '../../Resource.js';
import Permissions from './Permissions/Permissions.js';

export default class Document extends Resource {
    permissions: Permissions;

    constructor(protected api: API, protected serverlessApi: API) {
        super(api, serverlessApi);

        this.permissions = new Permissions(api, serverlessApi);
    }
}
