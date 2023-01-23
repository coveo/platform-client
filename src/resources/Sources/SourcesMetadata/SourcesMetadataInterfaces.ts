import {PageModel} from '../../BaseInterfaces.js';

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
