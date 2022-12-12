import {AccountStatus} from '../../../Enums';
import {DeprecatedShortPaginatedParamParts, OrganizationParamParts, TimeRangeParamParts} from '../CommonParamParts';

export interface AccountInfoModelV15 {
    internalEventIps: string[];
    useStrictFieldValidation: boolean;
}

export interface AccountResponseV15 extends AccountInfoModelV15 {
    name: string;
    enabled: boolean;
    status: AccountStatus;
}

export interface StrictValidationTestResponseV15 {
    dimensionName: string;
    validationTestResults: Array<Record<string, unknown>>;
}

export interface StrictValidationTestParams
    extends OrganizationParamParts,
        TimeRangeParamParts,
        DeprecatedShortPaginatedParamParts {
    /**
     * The dimension to fetch.
     */
    d: string;
}
