import {FilterConditions} from '../FilterConditions.js';
import {DocumentRequirementStatus} from '../MachineLearningInterfaces.js';

export interface RGAPreviewParams {
    /**
     * The sources to consider.
     */
    sources: string[];
    /**
     * An array of filtering conditions.
     */
    filterConditions: FilterConditions[];
    /**
     * The query that determines the documents to extract
     */
    advancedQuery: string;
}

export interface RGADocumentGroupPreview {
    query: string;
    numberOfDocumentsInSources: number;
    numberOfValidDocuments: number;
    numberOfDocumentsInSourcesMatchingFilters: number;
    numberOfDocumentsInSourcesMatchingFiltersWithPermanentId: number;
    documentLimit: number;
    documentRequirementStatus: DocumentRequirementStatus;
}
