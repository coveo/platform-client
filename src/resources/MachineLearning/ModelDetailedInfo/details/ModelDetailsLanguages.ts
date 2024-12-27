export interface ModelDetailsLanguages {
    queries?: number;
    words?: number;
    stopwords?: number;
    topfacets?: string[];
    contextKeysToDocuments?: Record<string, number>;
    docPerFilters?: Record<string, number>;
}
