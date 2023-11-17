import {DocumentRequirementStatus} from '../Document.js';
import {FilterConditions} from '../FilterConditions.js';

export interface SESDocumentGroupPreviewParams {
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

export interface SESDocumentGroupPreview {
    /**
     * The query that was used to fetch document information.
     *
     * @Example @source==("Salesforce Notifier")
     */
    query: string;
    /**
     * The total number of documents in the selected sources.
     */
    numberOfDocumentsInSources: number;
    /**
     * The number of documents that are candidates for learning.
     */
    numberOfValidDocuments: number;
    /**
     * The number of documents in the selected sources that match the conditions.
     */
    numberOfDocumentsInSourcesMatchingFilters: number;
    /**
     * The number of documents in the selected sources that match the conditions and have a permanentid
     */
    numberOfDocumentsInSourcesMatchingFiltersWithPermanentId: number;
    /**
     * The limit of documents that are candidates for learning.
     */
    documentLimit: number;
    /**
     * Status for the number of required documents to build the model.
     */
    documentRequirementStatus: DocumentRequirementStatus;
}
