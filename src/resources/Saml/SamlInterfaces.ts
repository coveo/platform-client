import {IdAndDisplayNameModel} from '../BaseInterfaces';

export interface SamlIdentityProviderEnabledModel {
    organizationId: string;
    samlEnabled: boolean;
}

export interface SamlIdentityProviderModel {
    displayName: string;
    entityId: string;
    id: string;
    organizationIds: IdAndDisplayNameModel[];
    postBindingEndpoint: string;
    x509Certificate: string;
}
