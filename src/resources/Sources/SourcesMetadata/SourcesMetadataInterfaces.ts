export interface Metadata {
    /**
     * The key for a metadata.
     */
    key: string;
    /**
     * The frequency at which this metadata has been seen on documents.
     */
    frequency: number;
    /**
     * Subset of values for the metadata.
     */
    values: any[];
    /**
     * The origin of the metadata.
     */
    origin: string;
}
