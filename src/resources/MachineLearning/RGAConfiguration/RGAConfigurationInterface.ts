import {FilterConditions} from '../FilterConditions.js';
import {DocumentRequirementStatus} from '../DocumentInterfaces.js';

export interface RGAPreviewParams {
    /**
     * The sources to consider.
     */
    sources?: string[];
    /**
     * An array of filtering conditions.
     */
    filterConditions?: FilterConditions[];
    /**
     * The query that determines the documents to extract. Cannot be used with other document extraction parameters, e.g. sources, filter conditions, etc.
     *
     * @Example @source==("My source") AND @permanentid AND @language="English";
     */
    advancedQuery?: string;
}

export interface RGADocumentGroupPreview {
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
     * The number of documents in the selected sources that match the conditions and have a `permanentid`
     */
    numberOfDocumentsInSourcesMatchingFiltersWithPermanentId: number;
    /**
     * The maximum number of documents allowed to learn from.
     */
    documentLimit: number;
    /**
     * Status for the number of required documents to build the model.
     *
     * @Example OK
     */
    documentRequirementStatus: DocumentRequirementStatus;
}
