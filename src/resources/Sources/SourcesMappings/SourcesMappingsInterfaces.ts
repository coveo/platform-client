import {FieldTypes, MappingModelKind} from '../../Enums.js';

export interface MappingSettingsModel {
    /**
     * The [mapping](https://docs.coveo.com/en/217/) rules.
     * See [Mapping Rule Syntax Reference](https://docs.coveo.com/en/1839/).
     */
    rules: MappingRule[];
}

export interface UpdateTypedMappingSettingsModel extends MappingSettingsModel {
    /**
     * The unique identifier of the mapping.
     * Note: Typically matches the type value.
     * Example: Video
     */
    type: string;
}

export interface TypedMappingSettingsModel extends UpdateTypedMappingSettingsModel {
    /**
     * The [type](https://docs.coveo.com/en/210/) of item for which the mapping applies.
     * Example: Video
     */
    id: string;
}

export interface MappingsConfiguration {
    common: MappingSettingsModel;
    types: TypedMappingSettingsModel[];
}

export interface UpdateMappingsConfiguration {
    /**
     * The common [mappings](https://docs.coveo.com/en/217/)
     * (i.e., the mappings that apply to all [item](https://docs.coveo.com/en/210/) types).
     */
    common: MappingSettingsModel;
    /**
     * The specific [mappings](The specific mappings (i.e., the mappings that apply only to specified item types).)
     * (i.e., the mappings that apply only to specified [item](https://docs.coveo.com/en/210/) types).
     */
    types: UpdateTypedMappingSettingsModel[];
}

export interface MappingModel {
    content?: string;
    extractionMethod?: string;
    fieldName?: string;
    fieldTypeHint?: FieldTypes;
    id?: string;
    kind?: MappingModelKind;
    type?: string;
    literalContent?: string;
    metadataContent?: string;
}

export interface UpdateMappingRule {
    /**
     *
     * The mapping rule statements.
     * Example: ["%[internal_rating]"]
     * See [Mapping Rule Syntax Reference](https://docs.coveo.com/en/1839/).
     */
    content: string[];
    /**
     * The name of the target [field](https://docs.coveo.com/en/200/) to populate with
     * the first non-null value yielded by a mapping rule statement from the content array.
     * Example: rating
     */
    field: string;
}

export interface MappingRule extends UpdateMappingRule {
    /**
     * The unique identifier of the mapping rule.
     * Example: q5dpywnbpb3ul7xpyodh3e2j7i
     */
    id: string;
}
