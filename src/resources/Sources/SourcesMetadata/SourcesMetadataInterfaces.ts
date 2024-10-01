import {PageModel, Paginated} from '../../BaseInterfaces.js';
import {SortingOrder} from '../../Enums.js';

export enum MetadataIndexedBy {
    NONE = 'NONE',
    FIELD = 'FIELD',
    MAPPING = 'MAPPING',
}

export interface MetadataPageModel extends PageModel {
    items: Metadata[];
    creationDate: number;
    expirationDate: number;
    sampledDocumentCount: number;
    documentErrorCount: number;
}

export interface MetadataValue {
    /**
     * The metadata value
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadataValue: any;
    /**
     * The number of times the value has been seen on documents
     */
    count: number;
}

export interface Metadata {
    /**
     * The key for a metadata.
     */
    key: string;
    /**
     * The number of times the metadata has been seen in the sampled items.
     */
    count: number;
    /**
     * Subset of sample values for the metadata.
     */
    values: MetadataValue[];
    /**
     * The origin of the metadata.
     */
    origin: string;
    /**
     * Whether the origin is mapped or not.
     */
    isMapped: boolean;
    /**
     * How is the metadata indexed
     */
    indexedBy: MetadataIndexedBy;
}

export interface MetadataReportStatus {
    /**
     * Indicates that a report is being generated.
     */
    reportGenerationInProgress: boolean;
    /**
     * Indicates if a report is available.
     */
    reportAvailable: boolean;
    /**
     * Indicates if the source has documents sampled.
     * If false, reports cannot be generated.
     */
    sampleAvailable: boolean;
}

export interface MetadataParams extends Paginated {
    /**
     * Filters applied to the returned metadata. Only applies to metadata names, not values or origins.
     */
    filter?: string;

    /**
     * Indicate the sorting order, either ASC for ascending or DESC for descending
     */
    order?: SortingOrder;

    /**
     * Field on which the table is sorted
     */
    sortBy?: string;
}
