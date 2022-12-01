import {DimensionStatus, DimensionType} from '../../../Enums';
import {
    DeprecatedShortPaginatedParamParts,
    EventDimensionsFilterParamParts,
    OrganizationParamParts,
    TimeRangeParamParts,
    TimeZoneParamParts,
} from '../CommonParamParts';

export interface DimensionModel {
    /**
     * A collection of possible names to use when querying the statistics service with this dimension
     */
    apiNames: string[];
    /**
     * Whether the dimension is available in a visit's statistics.
     */
    availableInVisit?: boolean;
    /**
     * A flag indicating if the dimension is a custom dimension
     */
    custom: boolean;
    /**
     * The display name of the dimension
     */
    displayName: string;
    /**
     * Indicates the type of events that this dimension can be attached to.
     */
    eventTypes: string[];
    /**
     * The name of the dimension when returned by the statistics service
     */
    returnName: string;
    /**
     * The status of the dimension
     */
    status: DimensionStatus;
    /**
     * The type of the dimension
     */
    type: DimensionType;
    /**
     * The path in the custom_datas map corresponding to this dimension. For custom dimensions only.
     */
    path?: string[];
}

export interface DimensionValuesModel {
    values: Array<Record<string, string | number>>;
}

export interface CustomDimensionSuggestionModel {
    eventName?: string;
    apiName?: string;
    values?: string[];
}

export interface CustomDimensionModel {
    /**
     * The type of the dimension.
     */
    type: DimensionType;
    /**
     * The display name of the dimension. Should be human readable.
     */
    displayName: string;
    /**
     * The path in the custom_datas map corresponding to this dimension. For custom dimensions only.
     */
    path?: string[];
}

export interface ListDimensionsParams extends OrganizationParamParts {
    /**
     * This will filter out dimensions which are covered by others.
     * Only parent/master dimensions will be output.
     */
    includeOnlyParents?: boolean;
    /**
     * Whether to include custom dimensions within the results.
     */
    includeCustom?: boolean;
}

export interface GetDimensionValuesParams
    extends OrganizationParamParts,
        EventDimensionsFilterParamParts,
        TimeRangeParamParts,
        TimeZoneParamParts,
        DeprecatedShortPaginatedParamParts {}

export interface CreateCustomDimensionParams extends OrganizationParamParts {
    /**
     * The name of the custom dimension. It should start with the 'c_' prefix.
     * If not present, the prefix will be added automatically.
     */
    name: string;
    /**
     * The types of event where this dimension will be added.
     */
    event?: string[];
    /**
     * Whether to update the custom dimension in past events.
     *
     * @deprecated
     */
    updatePastEvents?: boolean;
}

export interface ListUncreatedDimensionsParams extends OrganizationParamParts, TimeRangeParamParts {
    /**
     * Whether value samples should be included in the response.
     */
    includeValueSamples?: boolean;
    /**
     * The number of events to look at when getting suggestions. A larger depth means more suggestions but also slower performance.
     */
    depth?: number;
}
