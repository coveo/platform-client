import {DimensionStatus, DimensionType} from '../../../Enums';

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

export interface ListDimensionsParams {
    org?: string;
    includeOnlyParents?: boolean;
    includeCustom?: boolean;
}

export interface GetDimensionValuesParams {
    from: string;
    to: string;
    tz?: string;
    org?: string;
    f?: string[];
    p?: number;
    n?: number;
}

export interface CreateCustomDimensionParams {
    /**
     * The name of the custom dimension. It should start with the 'c_' prefix.
     * If not present, the prefix will be added automatically.
     */
    name: string;
    /**
     * The name of the organization (Coveo Cloud V2 only)
     */
    org?: string;
    /**
     * The types of event where this dimension will be added.
     */
    event?: string[];
    /**
     * Whether to update the custom dimension in past events.
     */
    updatePastEvents?: boolean;
}

export interface ListUncreatedDimensionsParams {
    org?: string;
    from?: string;
    to?: string;
    includeValueSamples?: boolean;
    depth?: number;
}
