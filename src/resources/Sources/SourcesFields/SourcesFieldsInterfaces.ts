import {FieldModel, ListFieldsParams} from '../../Fields';
import {LightSourceModel} from '../SourcesInterfaces';
import {MappingModel} from '../SourcesMappings';

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
