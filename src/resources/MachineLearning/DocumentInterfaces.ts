import {FilterConditions} from './FilterConditions.js';

export type DocumentRequirementStatus = 'OK' | 'INSUFFICIENT_DOCUMENTS' | 'NB_OF_DOCUMENTS_OVER_LIMIT';

export interface DocumentPreviewParamsAdvanced {
    sources?: never;
    filterConditions?: never;
    /**
     * The query that determines the documents to extract. Cannot be used with other document extraction parameters, e.g. sources, filter conditions, etc.
     * @Example @source==("My source") AND @permanentid AND @language="English";
     */
    advancedQuery: string;
}

export interface DocumentPreviewParamsSources {
    /**
     * The sources to consider.
     */
    sources: string[];
    /**
     * An array of filtering conditions.
     */
    filterConditions: FilterConditions[];
    advancedQuery?: never;
}

export type DocumentGroupPreviewParams = DocumentPreviewParamsSources | DocumentPreviewParamsAdvanced;
