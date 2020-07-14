import {IntervalUnit} from '../../Enums';

export interface AutoSelectionFieldCandidateModel {
    name?: string;
    description?: string;
}

export interface ListCandidateFieldsParams {
    filter?: string;
    page?: number;
    perPage?: number;
}

export interface DocumentExtractionPreviewModel {
    numberOfDocuments?: number;
    recommendedNumberOfDocuments?: number;
    sources?: DocumentSourceModel[];
}

export interface DocumentSourceModel {
    name?: string;
    numberOfDocuments?: number;
}

export interface DocumentExtractionPreviewParams {
    fields?: string[];
    maximumNumberOfSources?: number;
}

export interface DocumentExtractionQueryModel {
    fields?: string[];
    sources?: string[];
}

export interface DNEConfigurationModel extends DNENewConfigurationModel {
    documentGroupId?: string;
    modelId?: string;
}

export interface DNENewConfigurationModel {
    commonFilter?: string;
    documentExtractionQuery?: string;
    exportPeriod?: string;
    fieldsToAutoSelect?: string[];
    intervalTime?: number;
    intervalUnit?: IntervalUnit;
    modelDisplayName: string;
    searchEventFilter?: string;
    viewAllContent?: boolean;
}
