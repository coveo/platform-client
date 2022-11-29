import {ParamParts} from '../ReadServiceCommon';

export interface AccountInfoModelV15 {
    internalEventIps: string[];
    useStrictFieldValidation: boolean;
}

export interface AccountResponseV15 extends AccountInfoModelV15 {
    name: string;
    enabled: boolean;
    status: any;
}

export interface StrictValidationTestResponseV15 {
    dimensionName: string;
    validationTestResults: Array<Record<string, unknown>>;
}

export interface StrictValidationTestParams
    extends ParamParts.Organization,
        ParamParts.TimeRange,
        ParamParts.DeprecatedShortPaginated {
    /**
     * The dimension to fetch.
     */
    d: string;
}
