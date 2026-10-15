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
    /**
     * The minimum, maximum, and mean number of snippets per document of the source.
     */
    snippetsPerDocument?: {
        min?: number;
        max?: number;
        mean?: number;
    };
    /**
     * The number of documents of the source per content stream used when building the model.
     * The values sum up to `documentsWithChunksCount` for the source.
     * @example {"markdown": 10, "content": 0}
     */
    documentStreams?: Record<string, number>;
}
