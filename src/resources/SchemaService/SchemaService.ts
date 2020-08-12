import API from '../../APICore';
import Ressource from '../Resource';
import {SchemaEntities, SchemaServiceQueryParams, SchemaFields} from './SchemaServiceInterfaces';
import {SourceType} from '../Enums';

export default class SchemaService extends Ressource {
    static baseUrl = `/rest`;
    static getBaseUrl = (sourceType: SourceType) =>
        `${SchemaService.baseUrl}/organizations/${API.orgPlaceholder}/schema/sources/${sourceType}`;

    constructor(protected api: API) {
        super(api);
    }

    getEntities(sourceType: SourceType, parameters?: SchemaServiceQueryParams) {
        return this.api.get<SchemaEntities>(
            this.buildPath(`${SchemaService.getBaseUrl(sourceType)}/entities`, parameters)
        );
    }

    getFields(sourceType: SourceType, entityName, parameters?: SchemaServiceQueryParams) {
        return this.api.get<SchemaFields>(
            this.buildPath(`${SchemaService.getBaseUrl(sourceType)}/entity/${entityName}`, parameters)
        );
    }
}
