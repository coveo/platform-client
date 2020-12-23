import {RestUserIdType} from '../Enums';

export interface RestTokenParams {
    userIds: RestUserId[];
    userGroups?: string[];
    userDisplayName?: string;
    canSeeUserProfileOf?: string[];
    pipeline?: string;
    filter?: string;
    searchHub?: string;
    salesforceOrganizationId?: string;
    validFor?: number;
    salesforceUser?: string;
    salesforceCommunityUrl?: string;
    salesforceFallbackToAdmin?: boolean;
    usertype?: string; // this is really usertype and not userType
    licenseDefinitionKey?: string;
    superUserToken?: string;
    commerce?: RestCommerceParameters;
    scope?: number; // Deprecated: This property is exposed for backward compatibility reasons only.
}

export interface RestUserId {
    name: string;
    provider: string;
    type?: RestUserIdType;
    infos?: any;
    authCookie?: string;
    password?: string; // Depecrated: This property is exposed for backward compatibility reasons only.
}

export interface RestCommerceParameters {
    catalogId: string;
    filter: string;
    operation: string;
}

export interface TokenModel {
    token: string;
}
