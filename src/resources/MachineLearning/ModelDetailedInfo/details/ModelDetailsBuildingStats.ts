import {ModelDetailsCommerceEvents} from './ModelDetailsCommerceEvents.js';
import {ModelDetailsStatsPerSource} from './ModelDetailsStatsPerSource.js';

export interface ModelDetailsBuildingStats {
    documentWithSnippetRatio?: number;
    headerCount?: number;
    snippetCount?: number;
    meanSnippetLength?: number;
    documentCount?: number;
    documentWithSnippetCount?: number;
    searchEventCount?: number;
    clickEventCount?: number;
    viewEventCount?: number;
    customEventCount?: number;
    segmentedVisitsCount?: number;
    searchCount?: number;
    clickCount?: number;
    viewCount?: number;
    visitsCount?: number;
    facetSelectEventCount?: number;
    snippetsPerDocument?: {
        min?: number;
        max?: number;
        mean?: number;
    };
    invalidHtmlDocumentCount?: number;
    documentWithoutIdCount?: number;
    documentWithDuplicatedIdCount?: number;
    commerceEventCounts?: ModelDetailsCommerceEvents;
    modelDetailedStatsPerSource?: ModelDetailsStatsPerSource[];
}
