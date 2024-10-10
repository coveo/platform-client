export interface ModelDetailsStatsPerSource {
    sourceName: string;
    documentCount: number;
    invalidHtmlDocumentCount: number;
    documentWithoutIdCount: number;
    documentWithDuplicatedIdCount: number;
}
