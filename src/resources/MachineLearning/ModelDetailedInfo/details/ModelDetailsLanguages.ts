export interface ModelDetailsLanguages {
    queries?: number;
    words?: number;
    stopwords?: number;
    topfacets?: string[];
    contextKeysToDocuments?: Map<string, number>;
    docPerFilters?: Map<string, number>;
}
