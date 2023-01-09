import {FieldModel, ListFieldsParams} from '../../Fields/index.js';
import {LightSourceModel} from '../SourcesInterfaces.js';
import {MappingModel} from '../SourcesMappings/index.js';

export interface ListSourcesFieldsParams extends ListFieldsParams {
    includeMappings?: boolean;
}

export interface SourceFieldModel extends FieldModel {
    sources?: LightSourceModel[];
    mappings?: FieldMappingModel[];
}

export interface FieldMappingModel {
    mappings: MappingModel[];
    sourceId: string;
    sourceName: string;
}
