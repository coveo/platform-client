import {PageModel} from '../../BaseInterfaces';

export interface MetadataPageModel extends PageModel {
    items: Metadata[];
    sampledDocumentCount: number;
    documentErrorCount: number;
}

export interface MetadataValue {
    /**
     * The metadata value
     */
    metadataValue: any;
    /**
     * The number of time the value has been seen on documents
     */
    count: number;
}

export interface Metadata {
    /**
     * The key for a metadata.
     */
    key: string;
    /**
     * The frequency in % at which this metadata has been seen on documents.
     */
    frequency: number;
    /**
     * Subset of sample values for the metadata.
     */
    values: MetadataValue[];
    /**
     * The origin of the metadata.
     */
    origin: string;
}

export interface MetadataReportStatus {
    /**
     * Indicate that a report is being generated.
     */
    reportGenerationInProgress: boolean;
    /**
     * Indicate if a report is available.
     */
    reportAvailable: boolean;
}
