import {DimensionStatus, DimensionType} from '../../../Enums';

export interface DimensionModel {
    apiNames: string[];
    availableInVisit?: boolean;
    custom: boolean;
    displayName: string;
    eventTypes: string[];
    returnName: string;
    status: DimensionStatus;
    type: DimensionType;
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
    type: DimensionType;
    displayName: string;
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
    org?: string;
    name?: string;
    event?: string[];
    updatePastEvents?: boolean;
}

export interface ListUncreatedDimensionsParams {
    org?: string;
    from?: string;
    to?: string;
    includeValueSamples?: boolean;
    depth?: number;
}
