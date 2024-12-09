export interface ModelDetailsStatsPerSource {
    sourceName: string;
    documentCount: number;
    invalidHtmlDocumentCount: number;
    documentWithoutIdCount: number;
    documentWithDuplicatedIdCount: number;
    documentsWithChunksCount?: number;
    documentsWithChunksRatio?: number;
    chunkCount?: number;
    chunksPerDocument?: {
        min?: number;
        max?: number;
        mean?: number;
    };
}
