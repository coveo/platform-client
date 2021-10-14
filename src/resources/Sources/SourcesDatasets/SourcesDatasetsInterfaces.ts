export interface DatasetModel {
    /*
     * Whether or not to include data in the created sources
     */
    hasStaticContent: boolean;
    /*
     * Name of the dataset
     */
    name: string;
    /*
     * Metadata about the dataset
     */
    note: string;
}

export enum DatasetType {
    /*
     * Dataset for web search
     */
    web = 'WEB',
    /*
     * Dataset for ecommerce search
     */
    ecommerce = 'ecommerce',
}
