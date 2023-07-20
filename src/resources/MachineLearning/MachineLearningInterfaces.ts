import {GranularResource, New} from '../BaseInterfaces.js';
import {IntervalUnit} from '../Enums.js';
import {MLModel} from './index.js';

export interface QueryReplacePatterns {
    pattern: string;
    ordering: string;
}

export interface UrlReplacePatterns {
    pattern: string;
    replace: string;
}

export interface PageViewFiltered {
    contentType: {
        values: string[];
    };
}

export interface CommerceSupport {
    enabled: boolean;
    [key: string]: any;
}

export interface IndexExport {
    query: string;
}

export interface DocumentContentSource {
    objectType: string;
    sourceLocations: [string];
}

export interface ExtraConfig {
    recommendedContentTypeFilter?: string[];
    eventConfigsTemplates?: string[];
    PageViewFiltered?: PageViewFiltered;
    automaticContextDiscovery?: boolean;
    blacklist?: string[];
    commerceSupport?: CommerceSupport;
    filterFields?: string[];
    recommendProductGroup?: boolean;
    testConfiguration?: boolean;
    userContextFields?: string[];
    whitelist?: string[];
    blackList?: string[];
    queryReplacePatterns?: QueryReplacePatterns[];
    recommendationStrategy?: string;
    urlReplacePatterns?: UrlReplacePatterns[];
    parsingMode?: string;
    documentContentSources?: DocumentContentSource[];
    indexExport?: IndexExport;
    [key: string]: any;
}

export interface RegistrationModel extends GranularResource {
    // The id of the engine
    engineId: string;
    // The model name
    modelName: string;
    // The model display name in the Coveo Cloud V2 administration console
    modelDisplayName?: string;
    /**
     * The period to export data from. Unless an exportOffset is specified, the exportPeriod uses the moment when the model was generated as a base.
     * Must be in the ISO8601 period format (i.e., PyYmMwWdDThHmMsS)
     */
    exportPeriod: string;
    // The number of intervalUnit between each run of the job, should be greater than or equal to 1
    intervalTime: number;
    // The duration unit of the interval between each run of the job. See intervalTime
    intervalUnit: IntervalUnit;
    /**
     * The offset period to apply to the export.
     * An undefined exportOffset means that the exportPeriod is based on the moment when the model was generated.
     * An exportOffset of P1W means that the exportPeriod is based on the moment one week before the model was generated.
     * If specified, must be in the ISO8601 period format (i.e., PyYmMwWdDThHmMsS)
     */
    exportOffset?: string;
    // The additional command line parameters that can be passed to the drill
    commandLineParameters?: string[];
    // The additional configuration that can be passed to the model
    extraConfig?: ExtraConfig;
    /**
     * The filter to apply to the common event dimensions (shared by all event types) in the export.
     * Multiple filter parameters are joined with the AND operator
     */
    commonFilter?: string;
    /**
     * The filter to apply to the custom event dimensions in the export.
     * Multiple filter parameters are joined with the AND operator
     */
    customEventFilter?: string;
    /**
     * The filter to apply to the click and search event dimensions in the export.
     * Multiple filter parameters are joined with the AND operator
     */
    searchEventFilter?: string;
    /**
     * The filter to apply to the view event dimensions (shared by all event types) in the export.
     * Multiple filter parameters are joined with the AND operator
     */
    viewEventFilter?: string;
    /**
     * The version matcher to select the valid drills.
     * See the documentation https://github.com/zafarkhaja/jsemver/#external-dsl
     */
    versionMatcher?: string;
}

export interface MLModelCreated extends New<MLModel> {
    // The unique identifier of the target model
    modelId: string;
    /**
     * The epoch date when the schedule will end.
     * If there is no end date, the schedule will last forever.
     */
    endTime?: number;
    /**
     * A timestamp indicating when to begin the first job (in milliseconds since UNIX epoch format).
     * If no start date is specified, the job starts immediately
     */
    startTime?: number;
    resourceId?: string;
}
