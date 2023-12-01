import {DocumentRequirementStatus} from '../DocumentInterfaces.js';

export interface RelevanceGenerativeAnsweringDocumentGroupPreview {
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
