import API from '../../APICore';
import Ressource from '../Resource';
import {SchemaEntities, SchemaServiceQueryParams, SchemaFields} from './SchemaServiceInterfaces';

export default class SchemaService extends Ressource {
    static baseUrl = `/rest`;

    constructor(protected api: API) {
        super(api);
    }

    getEntities(organizationId: string, sourceType: string, parameters?: SchemaServiceQueryParams) {
        return this.api.get<SchemaEntities>(
            this.buildPath(
                `${SchemaService.baseUrl}/organizations/${organizationId}/schema/sources/${sourceType}/entities`,
                parameters
            )
        );
    }

    getFields(organizationId: string, sourceType: string, entityName, parameters?: SchemaServiceQueryParams) {
        return this.api.get<SchemaFields>(
            this.buildPath(
                `${SchemaService.baseUrl}/organizations/${organizationId}/schema/sources/${sourceType}/entity/${entityName}`,
                parameters
            )
        );
    }
}
