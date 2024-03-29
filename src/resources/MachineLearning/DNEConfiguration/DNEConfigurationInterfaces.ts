import {Paginated} from '../../BaseInterfaces.js';
import {IntervalUnit} from '../../Enums.js';

export interface AutoSelectionFieldCandidateModel {
    name?: string;
    description?: string;
}

export interface ListCandidateFieldsParams extends Paginated {
    filter?: string;
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
